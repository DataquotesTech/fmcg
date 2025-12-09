"use client";

import { useEffect } from "react";

export default function AdPlacement({ id }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.ezstandalone?.cmd) {
      window.ezstandalone.cmd.push(() => {
        window.ezstandalone.showAds(id);
      });
    }
  }, [id]);

  return <div id={`ezoic-pub-ad-placeholder-${id}`} />;
}
