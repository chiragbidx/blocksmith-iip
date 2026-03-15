import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is Mailvibe really ready for production email marketing?",
    answer: "Yes! Mailvibe sends real emails via SendGrid and stores your campaigns in a secure, scalable database.",
    value: "item-1",
  },
  {
    question: "How do I send a campaign?",
    answer:
      "Just create a campaign in the dashboard, fill in your recipient emails, and hit 'Send'. Each recipient gets a real email.",
    value: "item-2",
  },
  {
    question: "Does Mailvibe support analytics and tracking?",
    answer:
      "Campaign analytics is coming soon! For now, you can track sent time and delivery status. Open/bounce tracking will be added.",
    value: "item-3",
  },
  {
    question: "Is there a free plan?",
    answer: "Yes. The Starter plan lets you send up to 200 emails/month at no cost. Upgrade any time for more volume.",
    value: "item-4",
  },
  {
    question: "Who is behind Mailvibe?",
    answer: "Mailvibe was built by Chirag Dodiya. Contact Chirag at hi@chirag.co for partnership, support, or suggestions.",
    value: "item-5",
  },
];

export const LayoutFaqSection = () => {
  return (
    <section id="faq" className="container mx-auto md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQ
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};