import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerDeleteSpace(
  server: McpServer,  
  httpClient: AxiosInstance
) {
  server.tool(
    'delete_space',
    'Deletes a memory space with the specified name',
    { 
      space_name: z.string().describe('The name of the memory space to delete')
    },
    async ({ space_name }) => {
      await httpClient.delete(`/memory/space/${space_name}`);

      return {
        content: [{ type: 'text', text: `Memory space deleted (name: ${space_name})` }]
      };
    }
  );
}