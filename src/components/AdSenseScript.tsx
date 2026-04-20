"use client";

import { useEffect } from "react";

const AD_CLIENT = "ca-pub-4094870352712876";
const SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

/** Carga el script de AdSense sin next/script para evitar el atributo data-nscript que advierte la consola de Google. */
export default function AdSenseScript() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);
  return null;
}
