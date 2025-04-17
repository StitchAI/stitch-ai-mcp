import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MemoryEntry } from '../types/memory';
import { AxiosInstance } from 'axios';

let memoryCounter = 1;

export function registerSaveMemory(
  server: McpServer,
  memoryDB: Record<string, MemoryEntry[]>,
  httpClient: AxiosInstance
) {
  server.tool(
    'save_memory',
    { id: z.string().optional(), content: z.string() },
    async ({ id, content }) => {
      const timestamp = new Date().toISOString();
      const assignedId = id?.trim() || `memory_${memoryCounter++}`;
      const history = memoryDB[assignedId] || [];
      const version = history.length > 0
        ? history[history.length - 1].version + 1
        : 1;
      const entry: MemoryEntry = { content, version, timestamp };
      memoryDB[assignedId] = [...history, entry];

      // POST to Stitch AI memory endpoint
      await httpClient.post('/v1/memory', {
        memoryId: assignedId,
        content,
        metadata: { version, timestamp },
      });

      return {
        content: [{ type: 'text', text: `Memory saved (ID: ${assignedId}, version: ${version})` }]
      };
    }
  );
}