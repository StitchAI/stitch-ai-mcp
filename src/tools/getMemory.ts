import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MemoryEntry } from '../types/memory';
import { AxiosInstance } from 'axios';

export function registerGetMemory(
  server: McpServer,
  memoryDB: Record<string, MemoryEntry[]>,
  httpClient: AxiosInstance
) {
  server.tool(
    'get_memory',
    { id: z.string(), version: z.number().optional() },
    async ({ id, version }) => {
      const history = memoryDB[id];
      if (!history) {
        return { content: [{ type: 'text', text: `Memory ID '${id}' not found.` }] };
      }
      const entry = version
        ? history.find(e => e.version === version)
        : history[history.length - 1];
      if (!entry) {
        return { content: [{ type: 'text', text: `Version ${version} not found for ID '${id}'.` }] };
      }

      // GET session metadata from Stitch AI
      const resp = await httpClient.get(`/v1/memory/${id}/session`);
      const sessionMeta = resp.data;

      return {
        content: [
          { type: 'text', text: `[Memory ${id} v${entry.version}] ${entry.content}` },
          { type: 'text', text: `Session meta: ${JSON.stringify(sessionMeta)}` }
        ]
      };
    }
  );
}