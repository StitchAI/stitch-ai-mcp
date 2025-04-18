import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerGetMemory(
  server: McpServer,  
  httpClient: AxiosInstance
) {
  server.tool(
    'get_memory',
    'Retrieves a specific memory by ID from a memory space',
    { 
      space: z.string().describe('The name of the memory space'),
      memory_id: z.string().describe('The ID of the memory to retrieve')
    },
    async ({ space, memory_id }) => {
      const response = await httpClient.get(`/memory/${space}/${memory_id}`);
      
      const memory = response.data;
      
      let resultText = `Memory details:\n`;
      resultText += `- ID: ${memory.id}\n`;
      resultText += `- Space: ${memory.space}\n`;
      resultText += `- Message: ${memory.message}\n`;
      
      if (memory.data.episodic) {
        resultText += `- Episodic Memory: ${memory.data.episodic}\n`;
      }
      
      if (memory.data.character) {
        resultText += `- Character Memory: ${memory.data.character}\n`;
      }
      
      return {
        content: [{ type: 'text', text: resultText }]
      };
    }
  );
}