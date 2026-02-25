import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  sectionTitle?: string
  items: FAQItem[]
}

export function FAQSection({ sectionTitle = '자주 묻는 질문', items }: FAQSectionProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{sectionTitle}</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
