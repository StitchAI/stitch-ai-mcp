import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';
import { registerMemorySpaceResource } from './memorySpaceResource';
import { registerSystemInfoResource } from './systemInfoResource';

export function registerAllResources(server: McpServer, httpClient: AxiosInstance) {
  registerMemorySpaceResource(server, httpClient);
  registerSystemInfoResource(server);
}