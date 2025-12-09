"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, AlertTriangle, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// CHANGE: Added Neo4j visualization component with live data integration
export default function KnowledgeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const neovisRef = useRef<any>(null);

  // CHANGE: Initialize Neo4j graph visualization
  useEffect(() => {
    const initializeGraph = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Import neovis dynamically
        const { default: NeoVis } = await import("neovis.js");

        // CHANGE: Configure Neo4j connection - Updated with actual critical fields
        const config = {
          container_id: "neo4j-graph-container",
          server_url: process.env.REACT_APP_NEO4J_URI || "bolt://localhost:7687",
          server_user: process.env.REACT_APP_NEO4J_USER || "neo4j",
          server_password: process.env.REACT_APP_NEO4J_PASSWORD || "password",
          // CHANGE: Updated labels to match actual Neo4j schema with critical fields
          labels: {
            User: {
              caption: "username",
              size: "pagerank",
              color: "#2563eb",
              title_properties: ["username", "user_department", "user_status"],
            },
            LoginEvent: {
              caption: "timestamp",
              size: "degree",
              color: "#7c3aed",
              title_properties: ["timestamp", "risk_score", "wazuh_rule_level"],
            },
            IPAddress: {
              caption: "source_ip",
              size: "degree",
              color: "#dc2626",
              title_properties: ["source_ip", "user_country"],
            },
            // CHANGE: Added Threat node for phishing/credential theft detection
            Threat: {
              caption: "threat_intel_hit",
              size: "degree",
              color: "#ea580c",
              title_properties: ["threat_intel_hit", "threat_intel_matches"],
            },
            // CHANGE: Added MitreATT&CK node for attack pattern tracking
            MitreAttack: {
              caption: "technique",
              size: "degree",
              color: "#f59e0b",
              title_properties: ["technique", "tactic"],
            },
            // CHANGE: Added Asset node for critical asset protection
            Asset: {
              caption: "asset_function",
              size: "degree",
              color: "#06b6d4",
              title_properties: ["asset_function", "asset_criticality"],
            },
            // CHANGE: Added WazuhRule node for rule-based correlation
            WazuhRule: {
              caption: "wazuh_rule_id",
              size: "degree",
              color: "#8b5cf6",
              title_properties: ["wazuh_rule_id", "rule_description"],
            },
          },
          relationships: {
            // CHANGE: Relationships for USE CASE 1: Login Anomaly Detection
            LOGGED_IN_FROM: {
              caption: true,
              color: "#64748b",
            },
            ORIGINATED_FROM: {
              caption: true,
              color: "#f97316",
            },
            ACCESSED_ASSET: {
              caption: true,
              color: "#06b6d4",
            },
            // CHANGE: Relationships for USE CASE 2: Phishing → Credential Theft Chain
            TRIGGERED_BY_THREAT: {
              caption: true,
              color: "#dc2626",
            },
            MATCHES_THREAT_INTEL: {
              caption: true,
              color: "#ea580c",
            },
            USES_TECHNIQUE: {
              caption: true,
              color: "#f59e0b",
            },
            DETECTS_BY_RULE: {
              caption: true,
              color: "#8b5cf6",
            },
            EXPLOITS_USER: {
              caption: true,
              color: "#dc2626",
            },
          },
          // CHANGE: Updated query to fetch nodes with critical fields
          initial_cypher: `
            MATCH (n)-[r]-(m) 
            WHERE n:User OR n:LoginEvent OR n:IPAddress OR n:Threat OR n:MitreAttack OR n:Asset OR n:WazuhRule
            RETURN n, r, m LIMIT 1000
          `,
          arrows: true,
          physics: {
            enabled: true,
            barnesHut: {
              gravitationalConstant: -26000,
              centralGravity: 0.005,
              springLength: 200,
              springConstant: 0.08,
              damping: 0.4,
              avoidOverlap: 0.2,
            },
          },
          interaction: {
            navigationButtons: true,
            keyboard: true,
            hover: true,
          },
        };

        // CHANGE: Initialize Neovis instance
        if (containerRef.current) {
          neovisRef.current = new NeoVis(config);
          neovisRef.current.render();
        }
      } catch (err) {
        setError(
          err instanceof Error 
            ? err.message 
            : "Failed to connect to Neo4j. Ensure the server is running and credentials are correct."
        );
        console.error("Neo4j visualization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeGraph();

    return () => {
      // CHANGE: Cleanup on unmount
      if (neovisRef.current) {
        neovisRef.current = null;
      }
    };
  }, []);

  // CHANGE: Refresh graph function
  const refreshGraph = () => {
    if (neovisRef.current) {
      setIsLoading(true);
      try {
        neovisRef.current.reload();
        setError(null);
      } catch (err) {
        setError("Failed to refresh graph");
        console.error("Refresh error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Graph</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {/* CHANGE: Updated description to reflect live Neo4j data */}
            Live Neo4j visualization - Threat relationships and attack patterns
          </p>
        </div>
        {/* CHANGE: Added refresh button */}
        <Button
          onClick={refreshGraph}
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* CHANGE: Error state display */}
      {error && (
        <Card className="p-4 bg-destructive/10 border-destructive/50">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Connection Error</p>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
              <p className="text-xs text-destructive/70 mt-2">
                {/* CHANGE: Instructions for Neo4j setup */}
                Ensure Neo4j is running at your configured server URL. 
                Check environment variables: REACT_APP_NEO4J_URI, REACT_APP_NEO4J_USER, REACT_APP_NEO4J_PASSWORD
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* CHANGE: Neo4j graph visualization container */}
      <Card className="overflow-hidden bg-gradient-card">
        <div
          ref={containerRef}
          id="neo4j-graph-container"
          className="w-full h-[600px] bg-background relative"
        >
          {isLoading && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <div className="text-center space-y-2">
                <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Loading graph from Neo4j...
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* CHANGE: Information badges - Updated for actual use cases */}
      <Card className="p-6 bg-gradient-card">
        <h3 className="font-semibold mb-4">Graph Legend - Critical Fields Mapping</h3>
        <div className="space-y-4">
          {/* USE CASE 1 */}
          <div className="border-b pb-4">
            <p className="text-sm font-medium mb-3">
              USE CASE 1: Context-Aware Login Anomaly Detection
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-xs">User (username, department, status)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500" />
                <span className="text-xs">LoginEvent (timestamp, risk_score)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-xs">IPAddress (source_ip, country)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-cyan-500" />
                <span className="text-xs">Asset (function, criticality)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-600" />
                <span className="text-xs">WazuhRule (rule_level, rule_id)</span>
              </div>
            </div>
          </div>

          {/* USE CASE 2 */}
          <div>
            <p className="text-sm font-medium mb-3">
              USE CASE 2: Phishing → Credential Theft Chain Detection
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span className="text-xs">Threat (threat_intel_hit, matches)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-xs">MitreATT&CK (technique, tactic)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-xs">User (exploited target)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* CHANGE: Setup instructions */}
      <Card className="p-4 bg-info/10 border-info/20">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-info mt-0.5" />
          <div className="text-left text-sm">
            <p className="font-medium">Neo4j Integration Active</p>
            <p className="text-muted-foreground mt-1">
              {/* CHANGE: Instructions for setting up environment */}
              This component connects to your Neo4j instance. Set environment variables in .env:
            </p>
            <code className="block mt-2 p-2 bg-background rounded text-xs font-mono">
              REACT_APP_NEO4J_URI=bolt://your-vm-ip:7687
              <br />
              REACT_APP_NEO4J_USER=neo4j
              <br />
              REACT_APP_NEO4J_PASSWORD=your-password
            </code>
          </div>
        </div>
      </Card>
    </div>
  );
}
