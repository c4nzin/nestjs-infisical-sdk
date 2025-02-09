import { InfisicalOptions } from 'src/interfaces/infisical-options.interface';
import { InfisicalSDK } from '@infisical/sdk';

export async function injectSecretsIntoEnv(
  client: InfisicalSDK,
  options: InfisicalOptions
): Promise<void> {
  if (!options.projectId) {
    throw new Error(
      'Missing Project ID. Please specify a valid Project ID to enable secrets injection into process.env.'
    );
  }

  const secretsResult = await client.secrets().listSecrets({
    environment: options.environment || 'dev',
    projectId: options.projectId,
    includeImports: true,
    secretPath: options.secretPath || '/'
  });

  const secrets = secretsResult?.secrets || [];

  for (const secret of secrets) {
    process.env[secret.secretKey] = secret.secretValue;
  }
}
