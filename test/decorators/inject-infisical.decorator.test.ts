jest.mock('@infisical/sdk', () => {
  return {
    InfisicalSDK: class {
      config: any;
      constructor(config: any) {
        this.config = config;
      }
      auth() {
        return {
          universalAuth: {
            login: async (params: any) => Promise.resolve({})
          }
        };
      }
      secrets() {
        return {
          listSecrets: async (params: any) => Promise.resolve([])
        };
      }
    }
  };
});

import { Test, TestingModule } from '@nestjs/testing';
import { Injectable } from '@nestjs/common';
import { InjectInfisical } from '../../src/decorators/inject-infisical.decorator';
import { InfisicalModule } from '../../src/infisical.module';
import { InfisicalOptions } from '../../src/interfaces/infisical-options.interface';
import * as dotenv from 'dotenv';
import { InfisicalSDK } from '@infisical/sdk';

dotenv.config();

@Injectable()
class TestService {
  constructor(@InjectInfisical() public readonly infisicalSdk: InfisicalSDK) {}
}

describe('InjectInfisical Decorator', () => {
  let module: TestingModule;
  let testService: TestService;

  beforeEach(async () => {
    const options: InfisicalOptions = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      projectId: 'test-project-id',
      injectIntoProcessEnv: true
    };

    module = await Test.createTestingModule({
      imports: [await InfisicalModule.register(options)],
      providers: [TestService],
      exports: [TestService]
    }).compile();

    testService = module.get<TestService>(TestService);
  });

  it('should be defined', () => {
    expect(testService).toBeDefined();
  });

  it('should have InfisicalSDK instance', () => {
    expect(testService.infisicalSdk).toBeDefined();
  });
});
