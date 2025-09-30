import { InfisicalOptions } from 'src/interfaces/infisical-options.interface';
import { InfisicalSDK } from '@infisical/sdk';
import { ProjectIdNotFoundException } from '../exceptions';

export async function injectSecretsIntoEnv(
  client: InfisicalSDK,
  options: InfisicalOptions
): Promise<void> {
  if (!options.projectId) {
    throw new ProjectIdNotFoundException();
  }

  const secretsResult = await client.secrets().listSecrets({
    environment: options.environment || 'dev',
    projectId: options.projectId,
    secretPath: options.secretPath || '/',
    expandSecretReferences: options.expandSecretReferences ?? true,
    viewSecretValue: options.viewSecretValue ?? true,
    recursive: options.recursive ?? false,
    includeImports: options.includeImports ?? false
  });

  const secrets = secretsResult?.secrets || [];

  for (const secret of secrets) {
    process.env[secret.secretKey] = secret.secretValue;
  }
}
