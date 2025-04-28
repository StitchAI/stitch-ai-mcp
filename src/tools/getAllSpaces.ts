import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerGetAllSpaces(
  server: McpServer,  
  httpClient: AxiosInstance,
  apiKey: string
) {
  server.tool(
    'get_all_spaces',
    'Gets all memory spaces',
    {},
    async () => {
      const userResponse = await httpClient.get(`/user/api-key/user?apiKey=${apiKey}`);
      const userId = userResponse.data.userId;

      const response = await httpClient.get(`/user/memory-space?userId=${userId}`);
      
      const spaces = response.data.data || [];
      const spacesList = spaces.map((space: any) => 
        `- ${space.name} (ID: ${space.id})`
      ).join('\n');
      
      return {
        content: [{ 
          type: 'text', 
          text: spacesList.length > 0 
            ? `Available memory spaces:\n${spacesList}` 
            : 'No memory spaces found.' 
        }]
      };
    }
  );
}