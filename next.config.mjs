import nextra from 'nextra';

// Nextra reads the wiki's pages from content/ (Markdown with components, MDX).
const withNextra = nextra({
  search: { codeblocks: false },
  defaultShowCopyCode: true,
});

export default withNextra({
  reactStrictMode: true,
  // A pure static site (out/), served by GitHub Pages at jfg.vibintoast.com (.github/workflows/deploy.yml).
  output: 'export',
  images: { unoptimized: true },
});
