import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "نهر AI — البنية التحتية التي تعمل عليها شركتك",
  description: "وكالة أتمتة بالذكاء الاصطناعي بعقود سنوية — نبني وننشر وندير البنية التشغيلية الرقمية الكاملة لشركات B2B في المملكة العربية السعودية",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
