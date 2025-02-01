import { InfisicalOptions } from "src/interfaces/infisical-options.interface";
import { InfisicalSDK } from "@infisical/sdk";

export async function injectSecretsIntoEnv(client: InfisicalSDK, options: InfisicalOptions) {
	if (!options.projectId) {
		throw new Error('Infisical environment settings are incomplete. Please provide a valid Project ID when enabling the injection of secrets into process.env.');
	}

	const secretsResult = await client.secrets().listSecrets({
		environment: options.environment || 'dev',
		projectId: options.projectId,
		includeImports: true,
		secretPath: options.secretPath || '/',
	});

	if (secretsResult?.secrets?.length) {
		secretsResult.secrets.forEach(secret => {
			process.env[secret.secretKey] = secret.secretValue;
		});
	}
}
