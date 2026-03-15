"use server";

import { db } from "@/lib/db/client";
import { campaigns } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { sendEmail } from "@/lib/email/sendgrid";
import { getAuthSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const campaignSchema = z.object({
  subject: z.string().min(2).max(200),
  content: z.string().min(2),
  recipients: z
    .string()
    .refine(
      (val) =>
        val
          .split(",")
          .map((e) => e.trim())
          .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
      "All emails must be valid"
    ),
});

export async function createCampaignAction(formData: FormData) {
  const session = await getAuthSession();
  if (!session?.userId) throw new Error("Not authenticated");

  const userId = session.userId;
  // TODO: Only allow for user's active team, demo uses first member team.
  // Team retrieval would depend on user's context, here simplified.
  const team = await db.query.teamMembers.findFirst({
    where: (teamMembers) => eq(teamMembers.userId, userId)
  });
  if (!team) throw new Error("No team found for campaign creation");

  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  const recipients = formData.get("recipients") as string;

  const parsed = campaignSchema.safeParse({ subject, content, recipients });
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const [campaign] = await db
    .insert(campaigns)
    .values({
      userId,
      teamId: team.teamId,
      subject,
      content,
      recipients,
      status: "draft",
    })
    .returning();

  revalidatePath("/dashboard/campaigns");
  return { id: campaign.id };
}

export async function sendCampaignAction(campaignId: string) {
  const session = await getAuthSession();
  if (!session?.userId) throw new Error("Not authenticated");

  const rows = await db
    .select()
    .from(campaigns)
    .where(and(eq(campaigns.id, campaignId), eq(campaigns.userId, session.userId)))
    .execute();

  if (!rows.length) throw new Error("Campaign not found");
  const campaign = rows[0];

  // Send email to recipients
  const recipientsList = campaign.recipients
    .split(",")
    .map((email: string) => email.trim())
    .filter((email: string) => !!email);

  let successCount = 0;
  let failedRecipients: string[] = [];
  for (const to of recipientsList) {
    const res = await sendEmail(to, campaign.subject, campaign.content);
    if (res.success) {
      successCount += 1;
    } else {
      failedRecipients.push(to);
    }
  }
  // Update campaign status and sentAt
  await db
    .update(campaigns)
    .set({
      status: failedRecipients.length ? "failed" : "sent",
      sentAt: new Date(),
    })
    .where(eq(campaigns.id, campaignId))
    .execute();

  revalidatePath("/dashboard/campaigns");
  return {
    sent: successCount,
    failed: failedRecipients,
  };
}

export async function listCampaignsAction() {
  const session = await getAuthSession();
  if (!session?.userId) throw new Error("Not authenticated");

  const rows = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.userId, session.userId))
    .orderBy(campaigns.createdAt)
    .execute();

  return rows.map((row: any) => ({
    id: row.id,
    subject: row.subject,
    status: row.status,
    createdAt: row.createdAt,
    sentAt: row.sentAt,
    recipients: row.recipients,
  }));
}