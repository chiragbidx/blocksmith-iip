import { listCampaignsAction, sendCampaignAction } from "./actions";
import CampaignForm from "@/components/dashboard/campaign-form";
import CampaignsList from "@/components/dashboard/campaigns-list";

export default async function CampaignsPage() {
  const campaigns = await listCampaignsAction();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-4">Email Campaigns</h1>
      <CampaignForm />
      <CampaignsList campaigns={campaigns} />
    </div>
  );
}