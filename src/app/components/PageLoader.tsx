"use client";
import { useEffect } from "react";

export default function PageLoader() {
  useEffect(() => {
    const id = window.setTimeout(() => {
      document.getElementById("loader")?.classList.add("hidden");
    }, 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div id="loader">
      <div className="loader-bloom">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loader-text">Nestling Space</p>
    </div>
  );
}
