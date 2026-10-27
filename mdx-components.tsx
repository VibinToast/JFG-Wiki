import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import { Callout, Cards, Steps, Tabs } from 'nextra/components';
import { Clip, Shot, Shots } from './components/gallery';
import { Figure, Legend, Status } from './components/wiki';

// Components every page can use without importing them: the theme's own, Nextra's Callout / Cards / Steps / Tabs,
// the wiki's Status chip, Legend and Figure, and the unused-content gallery's Shots, Shot and Clip.
const themeComponents = getThemeComponents();

export function useMDXComponents(components?: Record<string, React.ComponentType<any>>) {
  return {
    ...themeComponents,
    Callout,
    Cards,
    Steps,
    Tabs,
    Status,
    Legend,
    Figure,
    Shots,
    Shot,
    Clip,
    ...components,
  };
}
