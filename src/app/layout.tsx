import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lovacation - Connect Across Cultures",
  description: "Connect with people across Korea and Japan. Experience international dating with real-time translation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
