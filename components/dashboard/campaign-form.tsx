"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCampaignAction } from "@/app/dashboard/campaigns/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";

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

export default function CampaignForm() {
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      subject: "",
      content: "",
      recipients: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof campaignSchema>) => {
    startTransition(async () => {
      await createCampaignAction({
        get: (key: string) => values[key as keyof typeof values] || "",
      } as any);

      window.location.reload();
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-lg mb-8"
    >
      <div className="mb-4">
        <label className="block font-medium mb-1">Campaign Subject</label>
        <Input
          {...form.register("subject")}
          placeholder="Welcome to Mailvibe!"
          disabled={isPending}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Email Content (HTML allowed)
        </label>
        <Textarea
          {...form.register("content")}
          rows={5}
          placeholder="Write your marketing message here..."
          disabled={isPending}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Recipients (comma-separated emails)
        </label>
        <Textarea
          {...form.register("recipients")}
          rows={2}
          placeholder="customer1@email.com, customer2@email.com"
          disabled={isPending}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        Create Campaign
      </Button>
    </form>
  );
}