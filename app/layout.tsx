import { UserProvider } from '@auth0/nextjs-auth0/client';

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fabra Demo",
  description: "Fabra Demo by Ben Carr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`antialiased`}
        >
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
