import { NextRequest, NextResponse } from 'next/server'
import { client, writeClient } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (!postId) {
      return NextResponse.json({ error: 'Missing postId' }, { status: 400 })
    }

    const comments = await client.fetch(
      `*[_type == "comment" && post._ref == $postId && approved == true] | order(createdAt asc) {
        _id, authorName, body, createdAt
      }`,
      { postId } as Record<string, string>
    )

    return NextResponse.json({ comments })
  } catch (error) {
    console.error('Get comments error:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, authorName, authorEmail, body: commentBody } = body

    if (!postId || !authorName || !commentBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'comment',
      post: { _type: 'reference', _ref: postId },
      authorName,
      authorEmail: authorEmail ?? '',
      body: commentBody,
      approved: false,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Comment submitted and awaiting approval.',
    })
  } catch (error) {
    console.error('Post comment error:', error)
    return NextResponse.json({ error: 'Failed to submit comment' }, { status: 500 })
  }
}
