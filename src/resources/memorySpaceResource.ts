import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';

export function registerMemorySpaceResource(server: McpServer, httpClient: AxiosInstance) {
  server.resource(
    'memory-space',
    new ResourceTemplate('stitchai://memory-space/{space_name}', { list: undefined }),
    async (uri, { space_name }) => {
      try {
        const response = await httpClient.get(`/memory/${space_name}`);
        const data = response.data;
        
        return {
          contents: [{
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(data, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error retrieving memory space: ${error}`
          }]
        };
      }
    }
  );
  
  server.resource(
    'all-memory-spaces',
    'stitchai://memory-spaces',
    async (uri) => {
      try {
        const response = await httpClient.get('/memory/spaces');
        const spaces = response.data;
        
        return {
          contents: [{
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(spaces, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error retrieving memory spaces: ${error}`
          }]
        };
      }
    }
  );
}