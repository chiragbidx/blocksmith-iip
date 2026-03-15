import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Send",
    title: "Send Campaigns That Convert",
    description:
      "Mailvibe helps you launch beautiful, effective email marketing campaigns that drive results.",
  },
  {
    icon: "Users",
    title: "Grow and Segment Your Audience",
    description:
      "Easily manage lists and target the right subscribers for every send — segment for higher engagement.",
  },
  {
    icon: "TrendingUp",
    title: "Track Every Outcome",
    description:
      "Monitor delivered, opened, and bounced stats right from your dashboard (analytics coming soon).",
  },
  {
    icon: "Sparkle",
    title: "Polished, Fast, Reliable",
    description:
      "No-nonsense performance: blazing fast React dashboard with Postgres persistence and SendGrid for delivery.",
  },
];

export const LayoutBenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Why Mailvibe</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Email Marketing, Fast
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            From first send to scaling up, Mailvibe is the best starting point for founders seeking ownership over their customer messaging.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};