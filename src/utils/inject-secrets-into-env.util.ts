import { InfisicalOptions } from 'src/interfaces/infisical-options.interface';
import { InfisicalSDK } from '@infisical/sdk';

export async function injectSecretsIntoEnv(
  client: InfisicalSDK,
  options: InfisicalOptions
): Promise<void> {
  if (!options.projectId) {
    throw new Error(
      'Infisical environment settings are incomplete. Please provide a valid Project ID when enabling the injection of secrets into process.env.'
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
