import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What payment method do you accept?",
    answer:
      "We accept all major credit cards, Paypal, and various card payment methods depending on your locations. Please contact our support team for more information on accepted payment in your region",
  },
  {
    question: "How does the pricing work for teams?",
    answer:
      "Our pricing is per user, per month. This means you only pay for the number of teams members on your account. Discounts are available for larger teams and annua subscriptions. ",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be prorated and reflected in your next billing cycle",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use state-of-the-art encryption and comply with the best industry practices to ensure that your data is stored securely and accessed only by authorized user",
  },
];
const FAQs = () => {
  return (
    <div className="bg-black bg-gradient-to-b to-black from-[#5D2CAB] text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl sm:max-w-[648px] mx-auto tracking-tighter">
          Frequently asked questions
        </h2>

        <div className="max-w-[648px] mx-auto mt-12">
          <Accordion type="single" collapsible>
            {faqs.map(({ answer, question }) => (
              <AccordionItem value={question} key={question} className="py-4">
                <AccordionTrigger className="text-lg">
                  {question}
                </AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
