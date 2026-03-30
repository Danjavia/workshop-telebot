import { Tool } from '../../../../src/types/tool.js';

export const tool: Tool = {
  name: 'firecrawl',
  description: 'Web scraping, search, and data extraction using Firecrawl API. Use when users need to fetch web content, discover URLs on sites, search the web, or extract structured data from pages.',
  parameters: {
    type: 'object',
    properties: {
      command: {
        type: 'string',
        description: 'The firecrawl command to execute: scrape, map, search, or extract.'
      },
      url: {
        type: 'string',
        description: 'The target URL (required for scrape, map, and extract).'
      },
      query: {
        type: 'string',
        description: 'The search query (required for search).'
      },
      prompt: {
        type: 'string',
        description: 'The extraction prompt (required for extract).'
      },
      options: {
        type: 'string',
        description: 'Additional options (e.g., --format summary, --limit 10, --schema {...}).'
      }
    },
    required: ['command']
  },
  execute: async ({ command, url, query, prompt, options }) => {
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      return 'Error: FIRECRAWL_API_KEY is not set in environment variables.';
    }

    const baseUrl = 'https://api.firecrawl.dev/v1';
    
    try {
      if (command === 'scrape') {
        if (!url) return 'Error: URL is required for scrape command.';
        const response = await fetch(`${baseUrl}/scrape`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url, formats: ['markdown'] })
        });
        const data = await response.json();
        return JSON.stringify(data.data?.markdown || data, null, 2);
      }
      
      if (command === 'search') {
        if (!query) return 'Error: Query is required for search command.';
        const response = await fetch(`${baseUrl}/search`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query, limit: 5 })
        });
        const data = await response.json();
        return JSON.stringify(data, null, 2);
      }

      if (command === 'map') {
        if (!url) return 'Error: URL is required for map command.';
        const response = await fetch(`${baseUrl}/map`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        });
        const data = await response.json();
        return JSON.stringify(data, null, 2);
      }

      if (command === 'extract') {
        if (!url || !prompt) return 'Error: URL and prompt are required for extract command.';
        const response = await fetch(`${baseUrl}/extract`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ urls: [url], prompt })
        });
        const data = await response.json();
        return JSON.stringify(data, null, 2);
      }

      return `Error: Unknown command "${command}". Supported: scrape, search, map, extract.`;
    } catch (error) {
      return `Error calling Firecrawl API: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
};
