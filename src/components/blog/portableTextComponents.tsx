import Image from "next/image";
import type { PortableTextComponents } from "next-sanity";

type ImageValue = {
  alt?: string;
  caption?: string;
  asset?: {
    url?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  };
};

export const portablePostBodyComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value?: ImageValue }) => {
      const url = value?.asset?.url;
      if (!url) return null;
      const w = value.asset?.metadata?.dimensions?.width ?? 1200;
      const h = value.asset?.metadata?.dimensions?.height ?? 675;
      return (
        <figure className="my-8 not-prose">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={w}
            height={h}
            sizes="(max-width: 768px) 100vw, min(768px, 100%)"
            className="h-auto w-full rounded-xl"
          />
          {value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
};
