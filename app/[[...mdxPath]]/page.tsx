import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../mdx-components';
import { OG_IMAGES } from '../../components/og';

// Every page of content/ (the wiki), rendered with the docs theme's wrapper (its contents list, edit link, previous
// and next).
export const generateStaticParams = generateStaticParamsFor('mdxPath');

type Props = { params: Promise<{ mdxPath?: string[] }> };

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  const { title, description } = metadata;
  return {
    ...metadata,
    openGraph: { type: 'website', siteName: 'JFG Modding Wiki', title, description, images: OG_IMAGES },
    twitter: { card: 'summary_large_image', title, description, images: OG_IMAGES.map((i) => i.url) },
  };
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: Props) {
  const params = await props.params;
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath);
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
