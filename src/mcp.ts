import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createHttpClient } from './utils/httpClient';
import { registerCreateSpace } from './tools/createSpace';
import { registerDeleteSpace } from './tools/deleteSpace';
import { registerGetAllSpaces } from './tools/getAllSpaces';
import { registerGetAllMemories } from './tools/getAllMemories';
import { registerUploadMemory } from './tools/uploadMemory';
import { registerAllPrompts } from './prompts';
import { registerAllResources } from './resources';

export function createMcpServer(apiKey: string, baseURL: string): McpServer {
  const server = new McpServer({ name: 'StitchAI Memory MCP Server', version: '0.2.0' });
  const httpClient = createHttpClient(baseURL, apiKey);
  registerCreateSpace(server, httpClient, apiKey);
  registerDeleteSpace(server, httpClient, apiKey);
  registerGetAllSpaces(server, httpClient, apiKey);
  registerUploadMemory(server, httpClient, apiKey);
  registerGetAllMemories(server, httpClient, apiKey);

  registerAllPrompts(server);

  registerAllResources(server, httpClient);
  return server;
}