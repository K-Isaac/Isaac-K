export type Post = { id: string; slug: string; title: string; excerpt: string; content: string; published: boolean; created_at: string };
// Fallback posts shown until the Supabase backend is connected.
export const seedPosts: Post[] = [
  { id: "seed-1", slug: "evidence-goes-in", title: "Evidence goes in, solutions come out", excerpt: "Why every programme I design starts with research.", published: true, created_at: "2026-10-18",
    content: "## Start with evidence\nGood programmes start with a clear problem and the data to understand it.\n\n- Listen to the people affected\n- Test ideas small\n- Measure what matters\n\nMore posts coming soon." },
];
