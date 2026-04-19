"use client";

import { useEffect, useRef } from "react";

type AdUnitProps = {
  slot: string;
  format?: string;
  layout?: string;
  fullWidthResponsive?: boolean;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({ slot, format = "auto", layout, fullWidthResponsive = true, className = "" }: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {}
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: layout ? "block" : "block", textAlign: layout ? "center" : undefined }}
        data-ad-client="ca-pub-4094870352712876"
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { "data-ad-layout": layout } : {})}
        {...(fullWidthResponsive && !layout ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}
