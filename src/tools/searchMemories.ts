import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MemoryEntry } from '../types/memory';

export function registerSearchMemories(
  server: McpServer,
  memoryDB: Record<string, MemoryEntry[]>
) {
  server.tool('search_memories', { query: z.string() }, async ({ query }) => {
    const q = query.toLowerCase();
    const results: string[] = [];
    for (const [id, history] of Object.entries(memoryDB)) {
      const latest = history[history.length - 1];
      if (latest.content.toLowerCase().includes(q)) {
        results.push(`[${id} v${latest.version}] ${latest.content}`);
      }
    }
    if (results.length === 0) {
      return { content: [{ type: 'text', text: 'No matching memories found.' }] };
    }
    return { content: results.map(text => ({ type: 'text', text })) };
  });
}