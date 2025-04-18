import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerCreateSpace(
  server: McpServer,  
  httpClient: AxiosInstance
) {
  server.tool(
    'create_space',
    'Creates a new memory space with the specified name',
    { 
      space_name: z.string().describe('The name of the memory space to create')
    },
    async ({ space_name }) => {
      await httpClient.post('/memory/space', {
        name: space_name,
      });

      return {
        content: [{ type: 'text', text: `Memory space created (name: ${space_name})` }]
      };
    }
  );
}