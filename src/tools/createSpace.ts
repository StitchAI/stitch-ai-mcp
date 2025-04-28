import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';
import { MemorySpaceType } from '../types/memory-space';

export function registerCreateSpace(
  server: McpServer,  
  httpClient: AxiosInstance,
  apiKey: string
) {
  server.tool(
    'create_space',
    'Creates a new memory space with the specified name',
    { 
      space_name: z.string().describe('The name of the memory space to create'),
      type: z.nativeEnum(MemorySpaceType).describe('The type of memory space to create')
    },
    async ({ space_name, type }) => {
      // First, get the userId using the apiKey
      const userResponse = await httpClient.get(`/user/api-key/user?apiKey=${apiKey}`);
      const userId = userResponse.data.userId;

      // Then create the memory space with userId
      await httpClient.post(`/memory-space/create?apiKey=${apiKey}&userId=${userId}`, {
        repository: space_name,
        type: type
      });

      return {
        content: [{ type: 'text', text: `Memory space created (name: ${space_name}, type: ${type})` }]
      };
    }
  );
}