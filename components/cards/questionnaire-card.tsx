import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface QuestionnaireInfo {
  title: string;
  author: string;
  version?: string;
  purpose?: string;
  url: string;
}

export default function QuestionnaireCard(info: QuestionnaireInfo) {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{info.title}</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{info.author}</span>
          {info.version && <Badge variant="secondary">v{info.version}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-1 font-semibold">Date Created</h3>
          <p className="text-sm text-muted-foreground">{"something"}</p>
        </div>
        {info.purpose && (
          <div>
            <h3 className="mb-1 font-semibold">Purpose</h3>
            <p className="text-sm text-muted-foreground">{info.purpose}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" asChild>
          <a href={info.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Questionnaire
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
