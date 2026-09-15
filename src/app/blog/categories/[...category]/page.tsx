import { permanentRedirect } from "next/navigation";
import { blogPosts } from "@/content/blog";

/** Keep links from the former Wix category pages working. */
export default async function LegacyCategoryPage({
  params,
}: {
  params: Promise<{ category: string[] }>;
}) {
  const requested = (await params).category.join("/");
  const normalize = (value: string) => value.normalize("NFKC").toLowerCase();
  const categories = blogPosts.flatMap((post) => [post.category, ...(post.categories ?? [])]);
  const category = categories.find((value) => normalize(value) === normalize(requested));
  permanentRedirect(category ? `/blog?category=${encodeURIComponent(category)}` : "/blog");
}
