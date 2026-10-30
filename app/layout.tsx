import type { Metadata } from 'next';
import { Chakra_Petch, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import './jfg.css';
import { OG_IMAGES } from '../components/og';

// The three faces of the wiki's Jet Force Gemini look: a squared display face for headings and the logo, a plain
// sans for reading, a mono for code.
const display = Chakra_Petch({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-display', display: 'swap' });
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://jfg.vibintoast.com'),
  title: { default: 'JFG Modding Wiki', template: '%s · JFG Modding Wiki' },
  description: 'Make planets, levels, enemies, music, scripts and texture packs for Jet Force Gemini: Recompiled.',
  openGraph: { type: 'website', siteName: 'JFG Modding Wiki', images: OG_IMAGES },
  twitter: { card: 'summary_large_image', images: OG_IMAGES.map((i) => i.url) },
};

const RECOMP_REPO = 'https://github.com/VibinToast/JetForceGemini-Recompiled';

const navbar = (
  <Navbar
    projectLink={RECOMP_REPO}
    logo={
      <span className="jfg-logo">
        <span className="jfg-logo-mark">JFG</span> Modding Wiki
      </span>
    }
  >
    <a className="jfg-nav-link" href="https://vibintoast.com" title="VibinToast's site">
      vibintoast.com
    </a>
  </Navbar>
);

const footer = (
  <Footer>
    <span>
      <a href={RECOMP_REPO}>Jet Force Gemini: Recompiled</a> modding wiki by VibinToast. You need your own copy of the
      game: the tools and the packs they make carry nothing from it. The unused content pages show pictures rendered from
      the game for reference.
    </span>
  </Footer>
);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <Head
        color={{ hue: { dark: 192, light: 196 }, saturation: { dark: 75, light: 85 }, lightness: { dark: 62, light: 30 } }}
        backgroundColor={{ dark: '#0b1120', light: '#f4f6fa' }}
      />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/VibinToast/JFG-Wiki/tree/main"
          editLink="Edit this page on GitHub"
          feedback={{ content: null }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          nextThemes={{ defaultTheme: 'dark' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
