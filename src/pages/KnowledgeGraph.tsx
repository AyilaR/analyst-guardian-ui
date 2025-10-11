import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, AlertTriangle } from "lucide-react";

export default function KnowledgeGraph() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Knowledge Graph</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visualize threat relationships and attack patterns
        </p>
      </div>

      <Card className="p-12 bg-gradient-card">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="p-6 rounded-full bg-primary/10">
            <Network className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Interactive Graph Visualization</h2>
          <p className="text-muted-foreground max-w-md">
            The knowledge graph displays relationships between users, login events, 
            IP addresses, and detected threats. Click on nodes to explore connections 
            and understand attack patterns.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="outline">User Nodes</Badge>
            <Badge variant="outline">Login Events</Badge>
            <Badge variant="outline">Threat Indicators</Badge>
            <Badge variant="outline">Assets</Badge>
          </div>
          <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20 max-w-md">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium">Implementation Note</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Graph visualization requires integration with a library like Cytoscape.js 
                  or Vis.js. The mock implementation demonstrates the UI layout and interaction patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
