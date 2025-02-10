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

import { Test } from '@nestjs/testing';
import { InfisicalModule } from '../../src/infisical.module';

describe('Infisical Module', () => {
  it('should create infisical module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        InfisicalModule.register({
          clientId: 'client-id',
          clientSecret: 'client-secret',
          projectId: 'project-id'
        })
      ]
    }).compile();

    expect(module).toBeDefined();
  });

  it('should create infisical module with async', async () => {
    const module = await Test.createTestingModule({
      imports: [
        InfisicalModule.registerAsync({
          useFactory: () => ({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            projectId: 'project-id'
          }),
          inject: []
        })
      ]
    }).compile();

    expect(module).toBeDefined();
  });
});
