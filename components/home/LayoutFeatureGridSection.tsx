import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Mail",
    title: "Send Campaigns Instantly",
    description:
      "Launch emails to your whole audience — or hand-picked segments — with a simple workflow.",
  },
  {
    icon: "BarChart2",
    title: "Analytics (Coming Soon)",
    description:
      "Monitor deliveries, opens, and engagement with upcoming campaign stats and dashboards.",
  },
  {
    icon: "UserPlus2",
    title: "Organize Recipients Easily",
    description:
      "Input a comma-separated list of emails now, import CSV and full subscriber management soon.",
  },
  {
    icon: "ShieldCheck",
    title: "Security by Default",
    description:
      "GDPR, CAN-SPAM, and deliverability essentials — built on trusted platforms, privacy-first.",
  },
  {
    icon: "Sparkle",
    title: "Beautiful & Fast",
    description:
      "Slick, responsive UI with optimized workflows designed to get your campaign out on time.",
  },
  {
    icon: "Rocket",
    title: "Ready For Growth",
    description:
      "Built with scale in mind using Postgres, Drizzle ORM, and world-class Next.js technology.",
  },
];

export const LayoutFeatureGridSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Everything You Need to Ship Campaigns
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Mailvibe is the fastest way to design, launch, and track your marketing — right from your own dashboard.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};