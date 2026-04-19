import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Autora/Autor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Biografía", type: "text", rows: 4 }),
    defineField({ name: "credentials", title: "Credenciales", type: "string" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
  ],
  preview: { select: { title: "name", media: "photo" } },
});
