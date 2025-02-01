export interface ApiV3SecretsRawGet200Response {
  secrets: Array<ApiV1DashboardSecretsOverviewGet200ResponseSecretsInner>;
  imports?: Array<ApiV3SecretsRawGet200ResponseImportsInner>;
}

export interface ApiV3SecretsRawGet200ResponseImportsInner {
  secretPath: string;
  environment: string;
  folderId?: string;
  secrets: Array<ApiV3SecretsRawGet200ResponseImportsInnerSecretsInner>;
}

export interface ApiV3SecretsRawGet200ResponseImportsInnerSecretsInner {
  id: string;
  _id: string;
  workspace: string;
  environment: string;
  version: number;
  type: string;
  secretKey: string;
  secretValue: string;
  secretComment: string;
  secretReminderNote?: string | null;
  secretReminderRepeatDays?: number | null;
  skipMultilineEncoding?: boolean | null;
  metadata?: any | null;
  secretMetadata?: Array<ApiV1SecretApprovalRequestsIdGet200ResponseApprovalCommitsInnerSecretMetadataInner>;
}

export interface ApiV1SecretApprovalRequestsIdGet200ResponseApprovalCommitsInnerSecretMetadataInner {
  key: string;
  value?: string;
}

export interface ApiV1DashboardSecretsOverviewGet200ResponseSecretsInner {
  id: string;
  _id: string;
  workspace: string;
  environment: string;
  version: number;
  type: string;
  secretKey: string;
  secretValue: string;
  secretComment: string;
  secretReminderNote?: string | null;
  secretReminderRepeatDays?: number | null;
  skipMultilineEncoding?: boolean | null;
  metadata?: any | null;
  createdAt: string;
  updatedAt: string;
  secretPath?: string;
  secretMetadata?: Array<ApiV1SecretApprovalRequestsIdGet200ResponseApprovalCommitsInnerSecretMetadataInner>;
  tags?: Array<ApiV1DashboardSecretsOverviewGet200ResponseSecretsInnerTagsInner>;
}

export interface ApiV1DashboardSecretsOverviewGet200ResponseSecretsInnerTagsInner {
  id: string;
  slug: string;
  color?: string | null;
  name: string;
}

export interface ApiV3SecretsRawSecretNamePost200Response {
  secret: ApiV1SecretSecretIdSecretVersionsGet200ResponseSecretVersionsInner;
  approval: ApiV1SecretApprovalRequestsIdMergePost200ResponseApproval;
}

export interface ApiV1DynamicSecretsPost200Response {
  dynamicSecret: ApiV1DynamicSecretsGet200ResponseDynamicSecretsInner;
}

export interface ApiV1DynamicSecretsGet200ResponseDynamicSecretsInner {
  id: string;
  name: string;
  version: number;
  type: string;
  defaultTTL: string;
  maxTTL?: string | null;
  folderId: string;
  status?: string | null;
  statusDetails?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiV1DynamicSecretsLeasesPost200Response {
  lease: ApiV1DynamicSecretsNameLeasesGet200ResponseLeasesInner;
  dynamicSecret: ApiV1DynamicSecretsGet200ResponseDynamicSecretsInner;
  data?: any;
}

export interface ApiV1DynamicSecretsNameLeasesGet200ResponseLeasesInner {
  id: string;
  version: number;
  externalEntityId: string;
  expireAt: string;
  status?: string | null;
  statusDetails?: string | null;
  dynamicSecretId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiV1DynamicSecretsLeasesLeaseIdDelete200Response {
  lease: ApiV1DynamicSecretsNameLeasesGet200ResponseLeasesInner;
}

export interface ApiV1SecretApprovalRequestsIdMergePost200ResponseApproval {
  id: string;
  policyId: string;
  hasMerged?: boolean;
  status?: string;
  conflicts?: any | null;
  slug: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
  isReplicated?: boolean | null;
  committerUserId: string;
  statusChangedByUserId?: string | null;
  bypassReason?: string | null;
}

export interface ApiV1SecretSecretIdSecretVersionsGet200ResponseSecretVersionsInner {
  id: string;
  _id: string;
  workspace: string;
  environment: string;
  version: number;
  type: string;
  secretKey: string;
  secretValue: string;
  secretComment: string;
  secretReminderNote?: string | null;
  secretReminderRepeatDays?: number | null;
  skipMultilineEncoding?: boolean | null;
  metadata?: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiV3SecretsRawSecretNameGet200Response {
  secret: ApiV3SecretsRawSecretNameGet200ResponseSecret;
}

export interface ApiV3SecretsRawSecretNameGet200ResponseSecret {
  id: string;
  _id: string;
  workspace: string;
  environment: string;
  version: number;
  type: string;
  secretKey: string;
  secretValue: string;
  secretComment: string;
  secretReminderNote?: string | null;
  secretReminderRepeatDays?: number | null;
  skipMultilineEncoding?: boolean | null;
  metadata?: any | null;
  createdAt: string;
  updatedAt: string;
  tags?: Array<ApiV1DashboardSecretsOverviewGet200ResponseSecretsInnerTagsInner>;
  secretMetadata?: Array<ApiV1SecretApprovalRequestsIdGet200ResponseApprovalCommitsInnerSecretMetadataInner>;
}

export interface ApiV1DynamicSecretsDelete200Response {
  dynamicSecret: ApiV1DynamicSecretsGet200ResponseDynamicSecretsInner;
}
