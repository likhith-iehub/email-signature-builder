import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email signature builder",
  description:
    "Fill in your details and paste a professional HTML email signature into Gmail or Outlook—no coding.",
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
