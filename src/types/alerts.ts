// Type definitions for SOC Platform

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'pending' | 'investigating' | 'resolved' | 'false_positive';
export type AlertType = 'login_anomaly' | 'phishing' | 'credential_theft' | 'malware' | 'data_exfiltration';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  riskScore: number;
  riskLevel: RiskLevel;
  status: AlertStatus;
  timestamp: string;
  user: User;
  sourceIp: string;
  location: string;
  assetSensitivity: 'high' | 'medium' | 'low';
  narrative: string;
  indicators: {
    key: string;
    value: string;
  }[];
  recommendedActions: {
    id: string;
    action: string;
    rationale: string;
  }[];
  relatedAlerts?: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'user' | 'ip' | 'email' | 'asset' | 'threat';
  data?: any;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type: string;
}

export interface FeedbackSubmission {
  alertId: string;
  analystId: string;
  classification: 'true_positive' | 'false_positive' | 'benign_positive';
  notes: string;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  result: 'success' | 'failure';
  details: string;
}
