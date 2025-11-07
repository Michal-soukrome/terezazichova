import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { LoadingProvider } from "../components/LoadingProvider";
import ContentWrapper from "../components/ContentWrapper";

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
  title: "Tereza Zichova | malba, kresba, grafika",
  description:
    "Contemporary malba, kresba, grafika exploring the intersection between digital and analog mediums.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <LoadingProvider>
          <div className="flex min-h-screen">
            {/* Sidebar - Static, no loading overlay */}
            <Sidebar />

            {/* Main content area - With loading overlay */}
            <div className="flex-1 lg:ml-80">
              {/* Mobile header spacing */}
              <div className="lg:hidden h-16" />

              {/* Content wrapper with loading overlay */}
              <ContentWrapper>
                {/* Main content */}
                <main className="flex-1">{children}</main>

                {/* Footer */}
                <Footer />
              </ContentWrapper>
            </div>
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
