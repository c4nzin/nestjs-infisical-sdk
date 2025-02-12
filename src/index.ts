export * from './decorators/inject-infisical.decorator';
export * from './infisical.module';
export * from './interfaces/infisical-options.interface';
import { watchEnviromentFile } from './utils/file-watcher.util';

watchEnviromentFile();

export * from '@infisical/sdk';
export { watchEnviromentFile } from './utils/file-watcher.util';
