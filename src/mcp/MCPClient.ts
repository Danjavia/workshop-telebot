import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { Tool } from '../types/tool.js';

export class MCPClient {
  private clients: Map<string, Client> = new Map();

  async connect(url: string): Promise<void> {
    if (this.clients.has(url)) return;

    const transport = new SSEClientTransport(new URL(url));
    const client = new Client(
      { name: 'opengravity-agent', version: '1.0.0' },
      { capabilities: {} }
    );

    await client.connect(transport);
    this.clients.set(url, client);
  }

  async getTools(url: string): Promise<Tool[]> {
    const client = this.clients.get(url);
    if (!client) throw new Error(`Not connected to MCP server at ${url}`);

    const result = await client.listTools();
    
    return result.tools.map(mcpTool => ({
      name: mcpTool.name,
      description: mcpTool.description || '',
      parameters: mcpTool.inputSchema as any,
      execute: async (params: Record<string, unknown>) => {
        const callResult = await client.callTool({
          name: mcpTool.name,
          arguments: params
        });
        
        if (callResult.isError) {
          throw new Error(JSON.stringify(callResult.content));
        }
        
        return JSON.stringify(callResult.content);
      }
    }));
  }

  async disconnectAll(): Promise<void> {
    for (const client of this.clients.values()) {
      await client.close();
    }
    this.clients.clear();
  }
}
