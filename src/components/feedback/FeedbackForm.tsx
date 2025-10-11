import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

interface FeedbackFormProps {
  alertId: string;
}

export function FeedbackForm({ alertId }: FeedbackFormProps) {
  const [classification, setClassification] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = () => {
    if (!classification) {
      toast.error("Please select a classification");
      return;
    }

    // In real app: POST to /feedback API endpoint
    toast.success("Feedback submitted successfully");
    setClassification("");
    setNotes("");
  };

  return (
    <Card className="p-6 bg-gradient-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Analyst Feedback</h3>
        </div>

        <div>
          <Label className="text-sm mb-3 block">Classification</Label>
          <RadioGroup value={classification} onValueChange={setClassification}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="true_positive" id="tp" />
              <Label htmlFor="tp" className="cursor-pointer">True Positive (Real Threat)</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="false_positive" id="fp" />
              <Label htmlFor="fp" className="cursor-pointer">False Positive (No Threat)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="benign_positive" id="bp" />
              <Label htmlFor="bp" className="cursor-pointer">Benign Positive (Legitimate Activity)</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="notes" className="text-sm mb-2 block">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Provide context or reasoning for this classification..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          <Send className="h-4 w-4 mr-2" />
          Submit Feedback
        </Button>
      </div>
    </Card>
  );
}
