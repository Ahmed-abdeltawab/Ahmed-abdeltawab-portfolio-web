"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/logo";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-4"
    >
      <div className="glass-strong rounded-2xl px-6 py-4 border-gradient-animated">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 sm:gap-0">
          <Logo />
          <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base">
            <Link href="/" className="flex items-center group relative">
              <span className="font-fira font-medium text-primary">#</span>
              <span
                className={`font-fira font-medium transition-colors ${
                  isActive("/") ? "text-white" : "text-gray hover:text-white"
                }`}
              >
                home
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link href="/works" className="flex items-center group relative">
              <span className="font-fira text-primary">#</span>
              <span
                className={`font-fira transition-colors ${
                  isActive("/works")
                    ? "text-white"
                    : "text-gray hover:text-white"
                }`}
              >
                works
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive("/works") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link href="/about" className="flex items-center group relative">
              <span className="font-fira text-primary">#</span>
              <span
                className={`font-fira transition-colors ${
                  isActive("/about")
                    ? "text-white"
                    : "text-gray hover:text-white"
                }`}
              >
                about-me
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link href="/contact" className="flex items-center group relative">
              <span className="font-fira text-primary">#</span>
              <span
                className={`font-fira transition-colors ${
                  isActive("/contact")
                    ? "text-white"
                    : "text-gray hover:text-white"
                }`}
              >
                contact
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
