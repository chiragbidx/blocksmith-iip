import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Starter",
    popular: 0,
    price: 0,
    description:
      "Try Mailvibe for free. Great for MVPs and micro-startups.",
    buttonText: "Start for free",
    benefitList: [
      "Send up to 200 emails/month",
      "Real campaign sending",
      "All dashboard features",
      "Email support",
      "Self-serve onboarding",
    ],
  },
  {
    title: "Growth",
    popular: 1,
    price: 39,
    description:
      "For founders and teams scaling up campaign volume.",
    buttonText: "Start trial",
    benefitList: [
      "Unlimited emails*",
      "Advanced recipient management (soon)",
      "Deliverability tools",
      "Priority support",
      "Early analytics access",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 199,
    description:
      "For scale-ups that need compliance, advanced integrations and SLAs.",
    buttonText: "Contact sales",
    benefitList: [
      "White glove onboarding",
      "SSO/SAML (beta)",
      "Deliverability / IP warming",
      "Custom integration support",
      "Phone/email support from Chirag",
    ],
  },
];

export const LayoutPricingSection = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Just pay for what you need
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Mailvibe is free for early adopters. Scale with us as you grow. <span className="text-muted-foreground/60 text-sm">*</span> Unlimited plan subject to fair use policy.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-muted-foreground"> /month</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={
                    popular === PopularPlan?.YES ? "default" : "secondary"
                  }
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};