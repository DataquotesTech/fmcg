import { getBlogs } from "./data/mockData";
import { ensureSlug } from "./utils/slugify";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fmcginfluencer.com";

export default async function sitemap() {
  let blogEntries = [];
  try {
    const blogs = await getBlogs();
    blogEntries = blogs.map((blog) => {
      const slug = ensureSlug(blog);
      return {
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: blog.createdAt
          ? new Date(blog.createdAt).toISOString()
          : new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Failed to build blog sitemap entries:", error);
  }

  const staticEntries = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/#blogs`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#services`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/#network`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/#about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/register`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticEntries, ...blogEntries];
}
