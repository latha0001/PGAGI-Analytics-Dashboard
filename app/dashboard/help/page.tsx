import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Help Center</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions about using the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I customize my dashboard?</AccordionTrigger>
                <AccordionContent>
                  You can customize your dashboard by rearranging widgets, adding new ones, or removing existing ones. Visit the Settings page to manage your dashboard preferences.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I update my weather location?</AccordionTrigger>
                <AccordionContent>
                  Navigate to the Weather widget settings and enter your desired location. The weather information will automatically update to reflect the new location.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I manage my news preferences?</AccordionTrigger>
                <AccordionContent>
                  In the News widget settings, you can select your preferred news categories and sources. Your news feed will be personalized based on these preferences.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>Contact our support team for assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our support team is available 24/7 to help you with any questions or issues you may have.
              Email us at support@example.com or use the chat widget in the bottom right corner.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}