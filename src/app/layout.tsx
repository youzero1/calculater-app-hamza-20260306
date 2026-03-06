import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Calculator App',
  description: 'A modern calculator with history and sharing features',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page-container">
          <nav className="nav">
            <span className="nav-brand">⌨️ CalcApp</span>
            <div className="nav-links">
              <Link href="/" className="nav-link">Calculator</Link>
              <Link href="/history" className="nav-link">History</Link>
              <Link href="/feed" className="nav-link">Public Feed</Link>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
