import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, readTime, publishedAt,
    coverImage { asset->{url}, alt },
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, readTime, publishedAt,
    coverImage { asset->{url}, alt },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          url,
          metadata { dimensions { width, height } }
        }
      }
    },
    seoTitle, seoDescription,
  }
`;

export const postsByCategory = groq`
  *[_type == "post" && category == $category] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, readTime, publishedAt,
    coverImage { asset->{url}, alt },
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...6] {
    _id, title, slug, excerpt, category, readTime, publishedAt,
    coverImage { asset->{url}, alt },
  }
`;
