import { getPosts } from 'apis';

export default async function sitemap() {
  const posts = await getPosts(1, 1000, 0, '');

  return (posts?.items ?? []).map((item) => ({
    url: `${process.env.FRONT_URL}/posts/${item.id}`,
    lastModified: item.updatedAt,
  }));
}