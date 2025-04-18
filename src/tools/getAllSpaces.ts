import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerGetAllSpaces(
  server: McpServer,  
  httpClient: AxiosInstance
) {
  server.tool(
    'get_all_spaces',
    'Gets all memory spaces',
    {},
    async () => {
      const response = await httpClient.get('/memory/spaces');
      
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