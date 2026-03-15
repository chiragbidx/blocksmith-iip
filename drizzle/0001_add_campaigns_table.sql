-- Mailvibe Campaigns Table Migration (DRIZZLE ORM)

CREATE TABLE IF NOT EXISTS "campaigns" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "team_id" text NOT NULL,
  "subject" text NOT NULL,
  "content" text NOT NULL,
  "recipients" text NOT NULL,
  "status" text NOT NULL DEFAULT 'draft',
  "sent_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_campaigns_user_id FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
  CONSTRAINT fk_campaigns_team_id FOREIGN KEY("team_id") REFERENCES "teams"("id") ON DELETE CASCADE
);