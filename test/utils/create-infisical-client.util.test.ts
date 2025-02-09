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

import { InfisicalOptions } from '../../src/interfaces/infisical-options.interface';
import { createInfisicalClient } from '../../src/utils/create-infisical-client.util';

describe('createInfisicalClient', () => {
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
});
