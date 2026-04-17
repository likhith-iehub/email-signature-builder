import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email signature builder",
  description:
    "Upload your photo, copy once, and paste an HTML signature into Google Workspace (Gmail) or Outlook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
