import { getCollection, type CollectionEntry } from 'astro:content';

export async function entries(
  collection: 'blog' | 'pages' | 'settings',
  locale: string,
  options: { includeDrafts?: boolean } = {},
) {
  const includeDrafts = options.includeDrafts ?? import.meta.env.DEV;
  const all = await getCollection(collection, (entry: CollectionEntry<typeof collection>) => {
    const [entryLocale] = entry.id.split('/');
    return entryLocale === locale && (includeDrafts || !entry.data.draft);
  });
  return all.map((entry) => ({
    ...entry,
    slug: entry.id.split('/').slice(1).join('/'),
  }));
}

export async function allSlugs(collection: 'blog' | 'pages') {
  return getCollection(collection, (entry) => import.meta.env.DEV || !entry.data.draft);
}
