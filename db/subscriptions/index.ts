export interface SubscriptionType {
  cardUploads: number;
  csvImportedLeads: number;
  manualyCreatedLeads: number;
  aiGeneratedEmails: number;
  emailTemplates: number;
  emailSignatures: number;
  scheduledEmails: number;
  users: number;
  tags: number;
  reminders: number;
}

const tableName = "subscritions";
