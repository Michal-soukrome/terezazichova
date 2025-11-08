import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import { LoadingProvider } from "../components/LoadingProvider";
import ContentWrapper from "../components/ContentWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tereza Zichová - Malba, kresba, grafika",
  description:
    "Grafika, malba, kresba. Jsem Tereza Zichová a ráda vás vítám na mém webu, který se zaměřuje na mou tvorbu. Tak se pojďte podívat!",
  metadataBase: new URL("https://terezazichova.cz"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Tereza Zichová",
    "malba",
    "kresba",
    "grafika",
    "umění",
    "výtvarné umění",
    "česká malířka",
    "contemporary art",
    "Prague artist",
  ],
  authors: [{ name: "Tereza Zichová" }],
  creator: "Tereza Zichová",
  publisher: "Tereza Zichová",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://terezazichova.cz/",
    siteName: "Tereza Zichová",
    title: "Tereza Zichová - Malba, kresba, grafika",
    description:
      "Grafika, malba, kresba. Jsem Tereza Zichová a ráda vás vítám na mém webu, který se zaměřuje na mou tvorbu. Tak se pojďte podívat!",
    images: [
      {
        url: "/images/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Tereza Zichová - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tereza Zichová - Malba, kresba, grafika",
    description:
      "Grafika, malba, kresba. Jsem Tereza Zichová a ráda vás vítám na mém webu, který se zaměřuje na mou tvorbu. Tak se pojďte podívat!",
    images: ["/images/og-image.jpg"],
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Tereza Zichová",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased safe-area-x`}
      >
        <LoadingProvider>
          <div className="flex min-h-screen safe-area-y">
            {/* Sidebar - Static, no loading overlay */}
            <Sidebar />

            {/* Main content area - With loading overlay */}
            <div className="flex-1 lg:ml-80">
              {/* Mobile header spacing with safe area */}
              <div
                className="lg:hidden safe-area-top"
                style={{ height: "calc(4rem + env(safe-area-inset-top, 0px))" }}
              />

              {/* Content wrapper with loading overlay */}
              <ContentWrapper>
                {/* Main content */}
                <main className="flex-1 safe-area-bottom">{children}</main>
              </ContentWrapper>
            </div>
          </div>
        </LoadingProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleTagManager gtmId="GTM-5PD8635G" />
      </body>
    </html>
  );
}
