import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";
import PageLoader from "./components/PageLoader";

export const metadata: Metadata = {
  title: "The Nestling Space | Mental Wellness, Zimbabwe",
  description:
    "Culturally sensitive counselling, family support, marriage guidance, and mental wellness services in Zimbabwe. Book a session with Dr. M. Mugabe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton+SC&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PageLoader />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
