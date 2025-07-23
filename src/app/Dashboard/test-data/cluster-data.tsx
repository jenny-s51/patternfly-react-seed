// src/test-data/cluster-data.js

export const clusterData = [
  {
    id: 'cluster-1',
    name: 'Cluster Alpha',
    status: 'healthy',
    issues: 0,
    region: 'us-east-1',
    version: 'v1.0.0',
    health: 95,
    uptime: '24 days',
    lastCheckin: '2023-10-01T12:00:00Z',
    cpu: 60,
    memory: 70,
  },
  {
    id: 'cluster-2',
    name: 'Cluster Beta',
    status: 'warning',
    issues: 2,
    region: 'us-west-1',
    version: 'v1.0.1',
    health: 80,
    uptime: '15 days',
    lastCheckin: '2023-10-01T12:00:00Z',
    cpu: 85,
    memory: 90,
  },
  {
    id: 'cluster-3',
    name: 'Cluster Gamma',
    status: 'critical',
    issues: 5,
    region: 'eu-west-1',
    version: 'v1.0.2',
    health: 50,
    uptime: '5 days',
    lastCheckin: '2023-10-01T12:00:00Z',
    cpu: 95,
    memory: 95,
  },
];

export const criticalIssues = [
  {
    id: 'issue-1',
    severity: 'critical',
    message: 'Node failure detected',
    cluster: 'Cluster Gamma',
    affected: 'Node 3',
    timestamp: '2023-10-01T12:00:00Z',
  },
  {
    id: 'issue-2',
    severity: 'warning',
    message: 'High memory usage',
    cluster: 'Cluster Beta',
    affected: 'Node 1',
    timestamp: '2023-10-01T12:00:00Z',
  },
];

export const logs = [
  {
    id: 'log-1',
    severity: 'info',
    message: 'Cluster started successfully',
    cluster: 'Cluster Alpha',
    source: 'system',
    timestamp: '2023-10-01T12:00:00Z',
  },
  {
    id: 'log-2',
    severity: 'error',
    message: 'Failed to connect to database',
    cluster: 'Cluster Gamma',
    source: 'application',
    timestamp: '2023-10-01T12:05:00Z',
  },
];
