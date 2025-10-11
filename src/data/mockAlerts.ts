import { Alert, AuditLog } from '@/types/alerts';

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-2025-001',
    type: 'login_anomaly',
    title: 'Suspicious Login from Unusual Location',
    description: 'User logged in from IP address in high-risk country while regular location shows different continent',
    riskScore: 95,
    riskLevel: 'critical',
    status: 'pending',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    user: {
      id: 'USR-4521',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'Finance Manager',
      department: 'Finance'
    },
    sourceIp: '185.220.101.23',
    location: 'Moscow, Russia',
    assetSensitivity: 'high',
    narrative: 'User Sarah Chen attempted login from Moscow, Russia (IP: 185.220.101.23) at 14:32 UTC. This is highly anomalous as user typically accesses from San Francisco, CA. No travel notification on file. Multiple failed MFA attempts detected.',
    indicators: [
      { key: 'Failed MFA Attempts', value: '3' },
      { key: 'Distance from Home', value: '5,800 miles' },
      { key: 'Known VPN Exit Node', value: 'Yes' },
      { key: 'Threat Intelligence', value: 'IP flagged in 12 incidents' }
    ],
    recommendedActions: [
      {
        id: 'ACT-001',
        action: 'Enforce Step-Up MFA',
        rationale: 'High-risk location combined with failed authentication attempts suggests credential compromise'
      },
      {
        id: 'ACT-002',
        action: 'Temporary Account Lock',
        rationale: 'Prevent unauthorized access while investigation proceeds'
      },
      {
        id: 'ACT-003',
        action: 'Contact User via Secondary Channel',
        rationale: 'Verify legitimacy through phone/SMS to registered device'
      }
    ],
    relatedAlerts: ['ALT-2025-008']
  },
  {
    id: 'ALT-2025-002',
    type: 'phishing',
    title: 'Phishing Campaign Detected',
    description: 'Coordinated phishing emails targeting multiple users with credential harvesting links',
    riskScore: 88,
    riskLevel: 'high',
    status: 'investigating',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    user: {
      id: 'USR-7834',
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@company.com',
      role: 'Senior Developer',
      department: 'Engineering'
    },
    sourceIp: '203.0.113.42',
    location: 'Lagos, Nigeria',
    assetSensitivity: 'medium',
    narrative: 'Email from spoofed domain "companyy.com" (note extra y) sent to 47 employees. Subject: "Urgent: Password Reset Required". Contains link to credential harvesting site mimicking company SSO portal. 3 users clicked, 1 entered credentials.',
    indicators: [
      { key: 'Recipients Targeted', value: '47' },
      { key: 'Click Rate', value: '6.4%' },
      { key: 'Credentials Submitted', value: '1' },
      { key: 'Domain Age', value: '2 days' },
      { key: 'SSL Certificate', value: 'Self-signed' }
    ],
    recommendedActions: [
      {
        id: 'ACT-004',
        action: 'Block Sender Domain',
        rationale: 'Prevent additional emails from reaching users'
      },
      {
        id: 'ACT-005',
        action: 'Force Password Reset for Affected Users',
        rationale: 'User credentials may be compromised, immediate reset required'
      },
      {
        id: 'ACT-006',
        action: 'Security Awareness Training',
        rationale: 'Deploy targeted training to improve phishing detection'
      }
    ],
    relatedAlerts: ['ALT-2025-001', 'ALT-2025-009']
  },
  {
    id: 'ALT-2025-003',
    type: 'credential_theft',
    title: 'Potential Credential Stuffing Attack',
    description: 'Multiple failed login attempts from distributed IPs targeting admin accounts',
    riskScore: 82,
    riskLevel: 'high',
    status: 'pending',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    user: {
      id: 'USR-1023',
      name: 'Admin Account (admin@company.com)',
      email: 'admin@company.com',
      role: 'System Administrator',
      department: 'IT'
    },
    sourceIp: '192.0.2.156',
    location: 'Distributed (15+ countries)',
    assetSensitivity: 'high',
    narrative: 'Automated credential stuffing attack detected targeting admin accounts. 347 login attempts from 23 unique IPs across 15 countries in 10-minute window. Attack signatures match known botnet pattern.',
    indicators: [
      { key: 'Login Attempts', value: '347' },
      { key: 'Unique IPs', value: '23' },
      { key: 'Success Rate', value: '0%' },
      { key: 'Pattern Match', value: 'Mirai Botnet variant' }
    ],
    recommendedActions: [
      {
        id: 'ACT-007',
        action: 'Enable Rate Limiting',
        rationale: 'Throttle login attempts to mitigate automated attacks'
      },
      {
        id: 'ACT-008',
        action: 'Deploy CAPTCHA',
        rationale: 'Prevent automated bot authentication attempts'
      }
    ]
  },
  {
    id: 'ALT-2025-004',
    type: 'login_anomaly',
    title: 'Off-Hours Access to Sensitive System',
    description: 'Database access at 3:17 AM local time, outside normal working hours',
    riskScore: 65,
    riskLevel: 'medium',
    status: 'resolved',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    user: {
      id: 'USR-5521',
      name: 'David Park',
      email: 'david.park@company.com',
      role: 'Database Administrator',
      department: 'IT'
    },
    sourceIp: '10.0.1.45',
    location: 'Corporate Network - Seattle',
    assetSensitivity: 'high',
    narrative: 'DBA accessed production customer database at 3:17 AM PST from corporate VPN. While user has legitimate access, timing is unusual. Review shows user was performing scheduled maintenance per approved change ticket CHG-2025-0421.',
    indicators: [
      { key: 'Access Time', value: '03:17 AM PST' },
      { key: 'Normal Hours', value: '08:00-18:00 PST' },
      { key: 'Change Ticket', value: 'CHG-2025-0421 (approved)' },
      { key: 'Actions Taken', value: 'Index optimization, backup verification' }
    ],
    recommendedActions: [
      {
        id: 'ACT-009',
        action: 'No Action Required',
        rationale: 'Activity validated against approved change management process'
      }
    ]
  },
  {
    id: 'ALT-2025-005',
    type: 'data_exfiltration',
    title: 'Unusual Data Transfer Volume',
    description: 'Large file upload to external cloud storage service detected',
    riskScore: 78,
    riskLevel: 'high',
    status: 'pending',
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
    user: {
      id: 'USR-9012',
      name: 'Jennifer Liu',
      email: 'jennifer.liu@company.com',
      role: 'Marketing Coordinator',
      department: 'Marketing'
    },
    sourceIp: '172.16.0.89',
    location: 'Corporate Network - New York',
    assetSensitivity: 'medium',
    narrative: 'User uploaded 4.2 GB of data to personal Dropbox account. Volume is 20x higher than user baseline. Files include compressed archives with customer email lists and marketing analytics data.',
    indicators: [
      { key: 'Upload Volume', value: '4.2 GB' },
      { key: 'User Baseline', value: '210 MB avg' },
      { key: 'Destination', value: 'Dropbox (personal)' },
      { key: 'File Types', value: '.zip, .csv, .xlsx' },
      { key: 'Departure Notice', value: 'Resignation submitted 5 days ago' }
    ],
    recommendedActions: [
      {
        id: 'ACT-010',
        action: 'Suspend Cloud Access',
        rationale: 'Prevent continued data exfiltration while investigation proceeds'
      },
      {
        id: 'ACT-011',
        action: 'Contact HR & Legal',
        rationale: 'Potential insider threat given recent resignation'
      },
      {
        id: 'ACT-012',
        action: 'Review DLP Policies',
        rationale: 'Update policies to flag large uploads to personal cloud services'
      }
    ]
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'AUD-001',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    user: 'analyst@company.com',
    action: 'ALERT_APPROVED',
    resource: 'ALT-2025-001',
    result: 'success',
    details: 'Approved MFA enforcement action for suspicious login alert'
  },
  {
    id: 'AUD-002',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    user: 'analyst@company.com',
    action: 'FEEDBACK_SUBMITTED',
    resource: 'ALT-2025-004',
    result: 'success',
    details: 'Classified as false positive with notes'
  },
  {
    id: 'AUD-003',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    user: 'manager@company.com',
    action: 'POLICY_UPDATED',
    resource: 'DLP-POLICY-001',
    result: 'success',
    details: 'Updated data loss prevention threshold to 500MB'
  },
  {
    id: 'AUD-004',
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    user: 'analyst@company.com',
    action: 'ALERT_REJECTED',
    resource: 'ALT-2025-003',
    result: 'success',
    details: 'Rejected account lock - determined to be legitimate activity'
  }
];
