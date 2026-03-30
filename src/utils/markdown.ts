import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});

// Remove unnecessary elements
turndownService.remove(['script', 'style', 'nav', 'footer', 'iframe', 'noscript']);

export function htmlToMarkdown(html: string): string {
  try {
    const markdown = turndownService.turndown(html);
    return markdown;
  } catch (error) {
    console.error('Error converting HTML to Markdown:', error);
    return 'Error converting content to markdown.';
  }
}
