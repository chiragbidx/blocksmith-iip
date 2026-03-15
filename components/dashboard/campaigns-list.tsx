"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { sendCampaignAction } from "@/app/dashboard/campaigns/actions";

export default function CampaignsList({ campaigns }: { campaigns: any[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent Campaigns</h2>
      <table className="min-w-full bg-background border rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">Subject</th>
            <th className="py-2 px-4 text-left">Created At</th>
            <th className="py-2 px-4 text-left">Sent At</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Recipients</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id} className="border-t last:border-b">
              <td className="py-2 px-4">{c.subject}</td>
              <td className="py-2 px-4">
                {c.createdAt
                  ? new Date(c.createdAt).toLocaleString()
                  : ""}
              </td>
              <td className="py-2 px-4">
                {c.sentAt
                  ? new Date(c.sentAt).toLocaleString()
                  : "-"}
              </td>
              <td className="py-2 px-4 capitalize">{c.status}</td>
              <td className="py-2 px-4">{c.recipients.length > 80 ? c.recipients.slice(0, 80) + "..." : c.recipients}</td>
              <td className="py-2 px-4">
                {c.status === "draft" && (
                  <Button
                    size="sm"
                    variant="default"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await sendCampaignAction(c.id);
                        window.location.reload();
                      });
                    }}
                  >
                    Send
                  </Button>
                )}
                {c.status === "sent" && <span>Sent</span>}
                {c.status === "failed" && <span>Failed</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}