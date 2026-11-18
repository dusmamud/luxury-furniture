import { articles, getArticle } from '../../../lib/data/blog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => articles.map((a) => ({ slug: a.slug }));

export const load: PageLoad = ({ params }) => {
	return { article: getArticle(params.slug) };
};
