import { InfisicalSDK } from '@infisical/sdk';
import { InfisicalOptions } from 'src/interfaces/infisical-options.interface';

export async function createInfisicalClient(options: InfisicalOptions): Promise<InfisicalSDK> {
  const client = new InfisicalSDK({
    siteUrl: options.siteUrl || process.env.INFISICAL_SITE_URL || 'https://app.infisical.com'
  });

  await client.auth().universalAuth.login({
    clientId: options.clientId || process.env.INFISICAL_CLIENT_ID,
    clientSecret: options.clientSecret || process.env.INFISICAL_CLIENT_SECRET
  });

  if (options.renewToken) {
    await client.auth().universalAuth.renew();
  }

  if (options.setManuallyAccessToken) {
    client.auth().accessToken(options.setManuallyAccessToken || process.env.INFISICAL_ACCESS_TOKEN);
  }

  if (options.awsIamLogin) {
    await client.auth().awsIamAuth.login({
      identityId: options.awsIamLogin || process.env.INFISICAL_AWS_IAM_LOGIN
    });
  }

  if (options.renewAwsIamToken) {
    await client.auth().awsIamAuth.renew();
  }

  return client;
}
