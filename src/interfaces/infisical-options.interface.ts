/**
 * Options for configuring the Infisical SDK's Behaviour.
 */
export interface InfisicalOptions {
  /**
   * The client ID of your Machine Identity.
   */
  clientId: string;

  /**
   * The client secret of your Machine Identity.
   */
  clientSecret: string;

  /**
   * The environment in which to operate (e.g., "dev", "stg", "prod").
   */
  environment?: string;

  /**
   * The site URL for your Infisical instance. Defaults to "https://app.infisical.com".
   */
  siteUrl?: string;

  /**
   * Whether to renew the authentication token that is currently set.
   */
  renewToken?: boolean;

  /**
   * Manually set the access token for authentication.
   */
  setManuallyAccessToken?: string;

  /**
   * The ID of your AWS IAM identity for authentication.
   */
  awsIamLogin?: string;

  /**
   * Whether to renew the AWS IAM authentication token that is currently set.
   */
  renewAwsIamToken?: boolean; // You can renew the authentication token that is currently set by using the renew() method.

  /**
   * The project ID of your Infisical project.
   * Used to fetch secrets from the correct project and inject them into `process.env`.
   */
  projectId?: string;

  /**
   * The path within your Infisical project where secrets are stored.
   * Used to fetch secrets from a specific subpath and inject them into `process.env`.
   * Defaults to "/".
   */
  secretPath?: string;

  /**
   * Determines whether fetched secrets should be injected into `process.env`.
   * If `true`, secrets will be automatically set in `process.env`.
   * If `false`, secrets will only be returned and not modified.
   * Defaults to `false`.
   */
  injectIntoProcessEnv?: boolean;
}
