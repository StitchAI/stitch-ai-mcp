import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AxiosInstance } from 'axios';
import { registerSystemInfoResource } from './systemInfoResource';

export function registerAllResources(server: McpServer, httpClient: AxiosInstance) {
  registerSystemInfoResource(server);
}