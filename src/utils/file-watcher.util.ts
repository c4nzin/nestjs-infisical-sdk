import { Logger } from '@nestjs/common';
import chokidar from 'chokidar';
import dotenv from 'dotenv';

const logger = new Logger('InfisicalModule::FileAgent');

function reloadEnviroment(): void {
  logger.log('Reloading environment variables...');
  dotenv.config();
}

export function watchEnviromentFile(envFilePath = '.env'): void {
  const watcher = chokidar.watch(envFilePath, {
    persistent: true,
    ignoreInitial: true
  });

  watcher.on('change', () => {
    logger.log('Environment file changed.');
    reloadEnviroment();
  });

  watcher.on('error', (error: Error) => {
    logger.error('Error watching environment file', error);
  });
}
