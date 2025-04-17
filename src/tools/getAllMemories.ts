import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MemoryEntry } from '../types/memory';

export function registerGetAllMemories(
  server: McpServer,
  memoryDB: Record<string, MemoryEntry[]>
) {
  server.tool(
    'get_all_memories',
    {},
    async () => {
      const ids = Object.keys(memoryDB);
      if (ids.length === 0) {
        return { 
          content: [{ 
            type: "text" as const, 
            text: 'No memories stored.' 
          }] 
        };
      }
      const items = ids.map(id => {
        const latest = memoryDB[id][memoryDB[id].length - 1];
        return { 
          type: "text" as const, 
          text: `[${id} v${latest.version}] ${latest.content}` 
        };
      });
      return { content: items };
    }
  );
}