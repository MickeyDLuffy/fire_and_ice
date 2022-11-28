export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface EnvironmentService {
  production: boolean;
  version: string;
  enableDebugTools: boolean;
  logLevel: LogLevel;
  baseUri: string;
}
