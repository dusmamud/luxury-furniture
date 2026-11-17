import { articles } from '#lib/data/blog';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => articles.map((a) => ({ slug: a.slug }));
