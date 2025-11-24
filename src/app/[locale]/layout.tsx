import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            style={{background: 'radial-gradient(var(--color-primary), transparent)'}}
      >
        <div className="mx-auto max-w-screen-md min-h-screen">
          <NextIntlClientProvider>
            <QueryProvider>
              <AuthProvider>
                <Header title="Lovacation" subtitle="함께 만드는 여행 일정" />
                <main className="pb-[60px]">
                  {children}
                </main>
                <BottomNav />
                <Toaster position="top-center" richColors />
              </AuthProvider>
            </QueryProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
