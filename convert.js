const fs = require('fs');
let html = fs.readFileSync('legacy/index.html', 'utf8');

// Get body innerHTML
const bodyMatch = html.match(/<body>([\s\S]*?)<!-- ==========================================\s+JAVASCRIPT/);
let jsx = bodyMatch ? bodyMatch[1] : '';

// Replace class with className
jsx = jsx.replace(/class=/g, 'className=');

// Replace for with htmlFor
jsx = jsx.replace(/for=/g, 'htmlFor=');

// Replace Images/ with /Images/ for absolute paths
jsx = jsx.replace(/src="Images\//g, 'src="/Images/');
jsx = jsx.replace(/url\('Images\//g, 'url(\'/Images/');

// Self close tags
jsx = jsx.replace(/<img([^>]+?)>/g, (match, attrs) => {
  if (attrs.trim().endsWith('/')) return match;
  return `<img${attrs}/>`;
});
jsx = jsx.replace(/<input([^>]+?)>/g, (match, attrs) => {
  if (attrs.trim().endsWith('/')) return match;
  return `<input${attrs}/>`;
});
jsx = jsx.replace(/<br([^>]*?)>/g, (match, attrs) => {
  if (attrs.trim().endsWith('/')) return match;
  return `<br${attrs}/>`;
});

// Replace style="key: value; key2: value2" with style={{ key: 'value', key2: 'value2' }}
jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
  const styles = p1.split(';').filter(s => s.trim() !== '');
  const objStr = styles.map(s => {
    let [k, ...vParts] = s.split(':');
    let v = vParts.join(':');
    if (!v) return '';
    const camelK = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
    return `${camelK}: '${v.trim().replace(/'/g, "\\'")}'`;
  }).filter(Boolean).join(', ');
  return `style={{ ${objStr} }}`;
});

// Handle HTML comments
jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Attributes capitalization
jsx = jsx.replace(/tabindex=/g, 'tabIndex=');
jsx = jsx.replace(/onclick="([^"]*)"/g, 'onClick={() => { /* $1 */ }}'); // Just comment it out for now, we'll use effects
jsx = jsx.replace(/autocomplete="off"/g, 'autoComplete="off"');
jsx = jsx.replace(/novalidate/g, 'noValidate');

const template = `"use client";
import { useEffect } from 'react';
import initScripts from './scripts';

export default function Home() {
  useEffect(() => {
    initScripts();
  }, []);

  return (
    <>
${jsx}
    </>
  );
}
`;

fs.writeFileSync('temp-next/src/app/page.tsx', template);
console.log('Successfully wrote page.tsx');
