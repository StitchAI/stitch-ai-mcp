import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerGetAllMemories(
  server: McpServer,
  httpClient: AxiosInstance,
  apiKey: string
) {
  server.tool(
    'get_all_memories',
    'Gets all memories for a user with optional filtering',
    {
      memory_names: z.string().optional().describe('Comma-separated list of memory names to filter'),
      limit: z.string().optional().describe('Maximum number of memories to return'),
      offset: z.string().optional().describe('Number of memories to skip')
    },
    async ({ memory_names, limit = '50', offset = '0' }) => {
      // First, get the userId using the apiKey
      const userResponse = await httpClient.get(`/user/api-key/user?apiKey=${apiKey}`);
      const userId = userResponse.data.userId;

      // Build query parameters
      const queryParams = new URLSearchParams({
        apiKey,
        ...(memory_names && { memoryNames: memory_names }),
        limit,
        offset,
        userId
      });

      // Get user memories
      const response = await httpClient.get(`/user/memory/all?${queryParams.toString()}`);
      const memories = response.data;

      // Format the response
      const formattedMemories = memories.map((memory: any) => 
        `- ${memory.name}: ${memory.episodicMemory.content}`
      ).join('\n');

      return {
        content: [{ 
          type: 'text', 
          text: formattedMemories.length > 0 
            ? `User memories:\n${formattedMemories}` 
            : 'No memories found.'
        }]
      };
    }
  );
} 