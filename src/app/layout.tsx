import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "@/app/globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import LoaderWrapper from "@/components/providers/loader-wrapper";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AnimatedBackground from "@/components/ui/animated-background";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import ThemeToggle from "@/components/ui/theme-toggle";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Personal portfolio website showcasing my work as a Front-End Developer",
};

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaCode.className}>
      <body>
        <ThemeProvider>
          <LoaderWrapper>
            <SmoothScrollProvider>
              <AnimatedBackground />
              <Header />
              {children}
              <Footer />
              <ThemeToggle />
            </SmoothScrollProvider>
          </LoaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
