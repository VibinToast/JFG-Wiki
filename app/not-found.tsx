import { NotFoundPage } from 'nextra-theme-docs';

export default function NotFound() {
  return (
    <NotFoundPage content="Report a broken link" labels="broken-link">
      <h1>This page isn't here</h1>
      <p>It may have moved. Use the search or the page list.</p>
    </NotFoundPage>
  );
}
