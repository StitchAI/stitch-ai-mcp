import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerUploadMemory(
  server: McpServer,  
  httpClient: AxiosInstance,
  apiKey: string
) {
  server.tool(
    'upload_memory',
    'Uploads a new memory to a specified memory space',
    { 
      space: z.string().describe('The name of the memory space to upload to'),
      message: z.string().describe('The memory message to upload'),
      memory: z.string().describe('The episodic memory content')
    },
    async ({ space, message, memory }) => {
      const userResponse = await httpClient.get(`/user/api-key/user?apiKey=${apiKey}`);
      const userId = userResponse.data.userId;

      const response = await httpClient.post(`/memory/${space}/create?apiKey=${apiKey}&userId=${userId}`, {
        files: [
          {
            filePath: 'episodic',
            content: memory
          }
        ],
        message: message
      });
      
      const memoryData = response.data;
      
      return {
        content: [{ 
          type: 'text', 
          text: `Memory uploaded successfully to space "${space}" with ID: ${memoryData.id}` 
        }]
      };
    }
  );
} 