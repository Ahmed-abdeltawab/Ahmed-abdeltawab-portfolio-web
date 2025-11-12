import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "@/app/globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import AnimatedBackground from "@/components/ui/animated-background";

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
        <SmoothScrollProvider>
          <AnimatedBackground />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
