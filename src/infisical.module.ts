import { Module, DynamicModule, Provider, Logger } from '@nestjs/common';
import { InfisicalSDK } from '@infisical/sdk';
import { InfisicalOptions } from './interfaces/infisical-options.interface';
import { INFISICAL_OPTIONS } from './constants';
import { createInfisicalClient, injectSecretsIntoEnv } from './utils';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './core/exceptions/exception.filter';

const logger = new Logger('InfisicalModule');

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter
    }
  ]
})
export class InfisicalModule {
  public static async register(options: InfisicalOptions): Promise<DynamicModule> {
    const client = await createInfisicalClient(options);

    logger.log('Infisical client created.');

    if (options.injectIntoProcessEnv) {
      logger.log('Injecting secrets into process.env');
      await injectSecretsIntoEnv(client, options);
      logger.log('Secrets injected.');
    }

    return {
      module: InfisicalModule,
      imports: [ConfigModule.forRoot({ ignoreEnvFile: true })],
      providers: [
        {
          provide: INFISICAL_OPTIONS,
          useValue: options
        },
        {
          provide: InfisicalSDK,
          useValue: client
        }
      ],
      exports: [InfisicalSDK]
    };
  }

  public static registerAsync(options: {
    useFactory: (...args: any[]) => Promise<InfisicalOptions> | InfisicalOptions;
    inject?: any[];
  }): DynamicModule {
    const asyncProviders: Provider[] = [
      {
        provide: INFISICAL_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      },
      {
        provide: InfisicalSDK,
        useFactory: async (options: InfisicalOptions): Promise<InfisicalSDK> => {
          const client = await createInfisicalClient(options);
          logger.log('ASYNC Infisical client created.');

          if (options.injectIntoProcessEnv) {
            await injectSecretsIntoEnv(client, options);
            logger.log('ASYNC secrets Injected. ');
          }

          return client;
        },
        inject: [INFISICAL_OPTIONS]
      }
    ];

    return {
      module: InfisicalModule,
      imports: [ConfigModule.forRoot({ ignoreEnvFile: true })],
      providers: asyncProviders,
      exports: [InfisicalSDK]
    };
  }
}
