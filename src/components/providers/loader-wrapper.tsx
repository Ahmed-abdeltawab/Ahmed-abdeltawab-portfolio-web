"use client";

import { useState, useEffect } from "react";
import LiquidGlassLoader from "@/components/ui/liquid-glass-loader";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user has already visited (using sessionStorage for per-session)
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      // Skip loader if already visited in this session
      setIsLoading(false);
    } else {
      // Show loader for first visit
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Don't render anything until mounted (prevents hydration issues)
  if (!mounted) {
    return null;
  }

  return (
    <>
      {isLoading && <LiquidGlassLoader onComplete={handleLoaderComplete} />}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        {children}
      </div>
    </>
  );
}
