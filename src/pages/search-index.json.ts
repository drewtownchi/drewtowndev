interface Frontmatter {
  title: string;
  excerpt: string;
  date: string;
}
interface MarkdownFile {
  frontmatter: Frontmatter;
  url: string;
  rawContent: () => string;
}

export async function get() {
  const filesResults = import.meta.glob<MarkdownFile>('./post/*.md', { eager: true });
  const posts = Object.values(filesResults);
  const index = posts.map((post) => {
    return {
      title: post.frontmatter.title,
      excerpt: post.frontmatter.excerpt,
      url: post.url,
      date: post.frontmatter.date,
      body: post.rawContent().replaceAll('\r\n\r\n', ''),
    };
  });
  return {
    body: JSON.stringify(index),
  };
}
