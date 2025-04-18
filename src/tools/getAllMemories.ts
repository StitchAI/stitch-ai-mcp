import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerGetAllMemories(
  server: McpServer,  
  httpClient: AxiosInstance
) {
  server.tool(
    'get_all_memories',
    'Retrieves all memories from a specified memory space',
    { 
      space: z.string().describe('The name of the memory space to retrieve memories from')
    },
    async ({ space }) => {
      const response = await httpClient.get(`/memory/${space}`);
      
      const spaceData = response.data;
      let resultText = `Memory space: ${spaceData.name}\n\n`;
      
      if (spaceData.memory) {
        resultText += `Current memory:\n- ID: ${spaceData.memory.id}\n- Message: ${spaceData.memory.message}\n\n`;
      } else {
        resultText += "No current memory found.\n\n";
      }
      
      if (spaceData.histories && spaceData.histories.length > 0) {
        resultText += "Memory history:\n";
        spaceData.histories.forEach((memory: any, index: number) => {
          resultText += `${index + 1}. ID: ${memory.id}, Message: ${memory.message}\n`;
        });
      } else {
        resultText += "No memory history found.";
      }
      
      return {
        content: [{ type: 'text', text: resultText }]
      };
    }
  );
} 