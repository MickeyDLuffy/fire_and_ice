// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentService } from './environment.service';

const fireAndIceApiBase = 'https://www.anapioficeandfire.com/api';
export const environment: EnvironmentService = {
  baseUri: fireAndIceApiBase,
  version: '1',
  enableDebugTools: false,
  production: false,
  logLevel: 'debug',
};
