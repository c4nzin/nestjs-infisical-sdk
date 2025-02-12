import { InfisicalOptions } from '../../src/interfaces/infisical-options.interface';
import { createInfisicalClient } from '../../src/utils/create-infisical-client.util';
import * as dotenv from 'dotenv';
import { FSWatcher } from 'chokidar';
import { watchEnviromentFile } from '../../src/utils/file-watcher.util';
import path from 'path';
import fs from 'fs';
import { Logger } from '@nestjs/common';
import { ClientCredentialsNotFoundException } from '../../src/exceptions';

jest.mock('@infisical/sdk', () => {
  class FakeInfisicalSDK {
    config: any;
    _auth: any;
    constructor(config: any) {
      this.config = config;
      this._auth = {
        universalAuth: {
          login: jest.fn(async (params: any) => Promise.resolve({})),
          renew: jest.fn(async () => Promise.resolve({}))
        },
        accessToken: jest.fn(),
        awsIamAuth: {
          login: jest.fn(async (params: any) => Promise.resolve({})),
          renew: jest.fn(async () => Promise.resolve({}))
        }
      };
    }
    auth() {
      return this._auth;
    }
  }
  return { InfisicalSDK: FakeInfisicalSDK };
});

jest.mock('dotenv', () => ({
  config: jest.fn()
}));

jest.mock('@nestjs/common', () => {
  const originalModule = jest.requireActual('@nestjs/common');
  return {
    ...originalModule,
    Logger: jest.fn().mockImplementation(() => ({
      log: jest.fn(),
      error: jest.fn()
    }))
  };
});

describe('createInfisicalClient', () => {
  let watcher: FSWatcher | undefined;
  const envFilePath = path.resolve(__dirname, '../../.env');

  watchEnviromentFile(envFilePath);
  dotenv.config();

  afterEach(() => {
    if (watcher) {
      watcher.close();
    }
  });

  it('should create client and call universalAuth.login with provided options', async () => {
    const options: InfisicalOptions = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      siteUrl: 'https://app.infisical.com'
    };
    const sdkInstance = await createInfisicalClient(options);
    expect(sdkInstance).toBeDefined();

    const auth = sdkInstance.auth();
    expect(auth.universalAuth.login).toHaveBeenCalledWith({
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret'
    });
  });

  it('should call universalAuth renew if renewToken is true', async () => {
    const options = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      renewToken: true
    };
    const sdkInstance = await createInfisicalClient(options);
    const auth = sdkInstance.auth();
    expect(auth.universalAuth.renew).toHaveBeenCalled();
  });

  it('should call accessToken if setManuallyAccessToken is provided', async () => {
    const options = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      setManuallyAccessToken: 'manual-access-token'
    };
    const sdkInstance = await createInfisicalClient(options);
    const auth = sdkInstance.auth();
    expect(auth.accessToken).toHaveBeenCalledWith('manual-access-token');
  });

  it('should call awsIamAuth login method if awsIamLogin is provided', async () => {
    const options = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      awsIamLogin: 'manual-aws-iam'
    };
    const sdkInstance = await createInfisicalClient(options);
    const auth = sdkInstance.auth();
    expect(auth.awsIamAuth.login).toHaveBeenCalledWith({
      identityId: 'manual-aws-iam'
    });
  });

  it('should call awsIamAuth renew method if renewAwsIamToken is true', async () => {
    const options = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      renewAwsIamToken: true
    };
    const sdkInstance = await createInfisicalClient(options);
    const auth = sdkInstance.auth();
    expect(auth.awsIamAuth.renew).toHaveBeenCalled();
  });

  it('should listen and log .env file changes and reload environment variables', async () => {
    const options: InfisicalOptions = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      watchEnvFile: true
    };

    let index = 0;
    for (index; index <= 2; index++) {
      fs.writeFileSync(envFilePath, `TEST_ENV=hello-test${index}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    await createInfisicalClient(options);

    const mockLogger = Logger as jest.MockedClass<typeof Logger>;
    expect(mockLogger).toHaveBeenCalled();
  });

  it('should handle missing clientId and clientSecret from options and environment variables', async () => {
    const options: InfisicalOptions = {
      clientId: '',
      clientSecret: ''
    };
    await expect(createInfisicalClient(options)).rejects.toThrow(
      ClientCredentialsNotFoundException
    );
  });
});
