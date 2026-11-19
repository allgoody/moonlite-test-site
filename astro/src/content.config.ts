import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const schema = z.object({
  title: z.string(),
  // The editor's required Latin address. It must not become the entry id:
  // Astro's glob loader would use a frontmatter `slug` instead of the file path,
  // which would drop the locale folder (`ru/hello` → `hello`) and empty every
  // collection. `generateId` below pins the id to the path.
  slug: z.string().optional(),
  draft: z.boolean().default(false),
  description: z.string().optional(),
  // YAML turns `2026-11-13` into a Date; accept both from the editor.
  date: z.coerce.string().optional(),
  cover: z.string().optional(),
});

/** `ru/hello.md` → `ru/hello`, ignoring any frontmatter `slug`. */
const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

// Entry ids look like `ru/hello` because of the per-locale folders.
export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog', generateId: idFromPath }),
    schema,
  }),
  pages: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/pages', generateId: idFromPath }),
    schema,
  }),
  settings: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/settings', generateId: idFromPath }),
    schema,
  }),
};
