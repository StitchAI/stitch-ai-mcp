import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerDeleteSpace(
  server: McpServer,  
  httpClient: AxiosInstance,
  apiKey: string
) {
  server.tool(
    'delete_space',
    'Deletes a memory space with the specified name',
    { 
      space_name: z.string().describe('The name of the memory space to delete')
    },
    async ({ space_name }) => {
      const userResponse = await httpClient.get(`/user/api-key/user?apiKey=${apiKey}`);
      const userId = userResponse.data.userId;

      await httpClient.delete(`/memory/space/${space_name}?apiKey=${apiKey}&userId=${userId}`);

      return {
        content: [{ type: 'text', text: `Memory space deleted (name: ${space_name})` }]
      };
    }
  );
}