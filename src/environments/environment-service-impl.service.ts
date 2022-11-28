import { Injectable } from '@angular/core';
import {EnvironmentService, LogLevel} from "./environment.service";
import {environment} from "./environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentServiceImpl implements EnvironmentService{

  constructor() { }


  get baseUri(): string {
    return environment.baseUri;
  }

  get version(): string {
    return environment.version;
  }

  get enableDebugTools(): boolean {
    return environment.enableDebugTools;
  }

  get logLevel(): LogLevel {
    return environment.logLevel as LogLevel;
  }

  get production(): boolean {
    return environment.production;
  }
}
