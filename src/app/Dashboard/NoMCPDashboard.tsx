import * as React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  EmptyState,
  EmptyStateBody,
  Flex,
  FlexItem,
  Gallery,
  Grid,
  GridItem,
  Icon,
  Label,
  List,
  ListItem,
  MenuToggle,
  MenuToggleElement,
  PageSection,
  Progress,
  ProgressMeasureLocation,
  ProgressSize,
  ProgressVariant,
  SearchInput,
  Select,
  SelectOption,
  Split,
  SplitItem,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Tabs,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';

import { ExpandableRowContent, Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import {
  BellIcon,
  ChartLineIcon,
  CheckCircleIcon,
  DatabaseIcon,
  EllipsisVIcon,
  ExclamationTriangleIcon,
  ExternalLinkAltIcon,
  FilterIcon,
  InfoCircleIcon,
  MonitoringIcon,
  NetworkIcon,
  SearchIcon,
  ServerIcon,
  TimesCircleIcon,
} from '@patternfly/react-icons';

// Mock data for demonstration
const clusterData = [
  {
    id: 'cluster-1',
    name: 'Production East',
    status: 'healthy',
    health: 95,
    nodes: 12,
    pods: 248,
    cpu: 65,
    memory: 72,
    issues: 1,
    lastUpdated: '2 minutes ago',
    region: 'us-east-1',
    version: '1.28.2',
  },
  {
    id: 'cluster-2',
    name: 'Production West',
    status: 'warning',
    health: 78,
    nodes: 8,
    pods: 156,
    cpu: 89,
    memory: 94,
    issues: 3,
    lastUpdated: '1 minute ago',
    region: 'us-west-1',
    version: '1.28.1',
  },
  {
    id: 'cluster-3',
    name: 'Development',
    status: 'critical',
    health: 45,
    nodes: 4,
    pods: 67,
    cpu: 25,
    memory: 38,
    issues: 8,
    lastUpdated: '5 minutes ago',
    region: 'us-central-1',
    version: '1.27.8',
  },
  {
    id: 'cluster-4',
    name: 'Staging',
    status: 'healthy',
    health: 88,
    nodes: 6,
    pods: 134,
    cpu: 55,
    memory: 67,
    issues: 0,
    lastUpdated: '3 minutes ago',
    region: 'eu-west-1',
    version: '1.28.2',
  },
];

const topIssues = [
  {
    id: 'issue-1',
    severity: 'critical',
    cluster: 'Development',
    message: 'Node disk space above 90%',
    affected: '2 nodes',
    timestamp: '5 minutes ago',
  },
  {
    id: 'issue-2',
    severity: 'warning',
    cluster: 'Production West',
    message: 'High CPU utilization detected',
    affected: '3 pods',
    timestamp: '8 minutes ago',
  },
  {
    id: 'issue-3',
    severity: 'warning',
    cluster: 'Production West',
    message: 'Memory pressure on nodes',
    affected: '2 nodes',
    timestamp: '12 minutes ago',
  },
  {
    id: 'issue-4',
    severity: 'info',
    cluster: 'Production East',
    message: 'Pod restart detected',
    affected: '1 pod',
    timestamp: '15 minutes ago',
  },
];

const logs = [
  {
    id: 'log-1',
    timestamp: '2024-01-15 14:32:15',
    level: 'ERROR',
    cluster: 'Development',
    component: 'kubelet',
    message: 'Failed to pull image "nginx:latest": rpc error: code = Unknown desc = Error response from daemon',
  },
  {
    id: 'log-2',
    timestamp: '2024-01-15 14:31:45',
    level: 'WARN',
    cluster: 'Production West',
    component: 'kube-scheduler',
    message: 'Failed to schedule pod: 0/8 nodes are available: 8 Insufficient memory',
  },
  {
    id: 'log-3',
    timestamp: '2024-01-15 14:30:22',
    level: 'INFO',
    cluster: 'Production East',
    component: 'kube-controller-manager',
    message: 'Successfully created new endpoint slice for service "web-service"',
  },
];

const Dashboard: React.FunctionComponent = () => {
  const [selectedCluster, setSelectedCluster] = React.useState<string | null>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [regionFilter, setRegionFilter] = React.useState('');
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = React.useState(false);
  const [isRegionFilterOpen, setIsRegionFilterOpen] = React.useState(false);
  const [isActionDropdownOpen, setIsActionDropdownOpen] = React.useState<Record<string, boolean>>({});
  const [expandedClusterNames, setExpandedClusterNames] = React.useState<string[]>([]);

  const setClusterExpanded = (cluster: (typeof clusterData)[0], isExpanding = true) =>
    setExpandedClusterNames((prevExpanded) => {
      const otherExpandedClusterNames = prevExpanded.filter((name) => name !== cluster.name);
      return isExpanding ? [...otherExpandedClusterNames, cluster.name] : otherExpandedClusterNames;
    });
  const isClusterExpanded = (cluster: (typeof clusterData)[0]) => expandedClusterNames.includes(cluster.name);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon color="var(--pf-v6-global--success-color--100)" />;
      case 'warning':
        return <ExclamationTriangleIcon color="var(--pf-v6-global--warning-color--100)" />;
      case 'critical':
        return <TimesCircleIcon color="var(--pf-v6-global--danger-color--100)" />;
      default:
        return <InfoCircleIcon />;
    }
  };

  const getProgressVariant = (status: string): ProgressVariant => {
    switch (status) {
      case 'healthy':
        return ProgressVariant.success;
      case 'warning':
        return ProgressVariant.warning;
      case 'critical':
        return ProgressVariant.danger;
      default:
        return ProgressVariant.success;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <TimesCircleIcon color="var(--pf-v6-global--danger-color--100)" />;
      case 'warning':
        return <ExclamationTriangleIcon color="var(--pf-v6-global--warning-color--100)" />;
      case 'info':
        return <InfoCircleIcon color="var(--pf-v6-global--info-color--100)" />;
      default:
        return <InfoCircleIcon />;
    }
  };

  const filteredClusters = clusterData.filter((cluster) => {
    const matchesSearch = cluster.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = !statusFilter || cluster.status === statusFilter;
    const matchesRegion = !regionFilter || cluster.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const totalClusters = clusterData.length;
  const healthyClusters = clusterData.filter((c) => c.status === 'healthy').length;
  const warningClusters = clusterData.filter((c) => c.status === 'warning').length;
  const totalIssues = clusterData.reduce((sum, cluster) => sum + cluster.issues, 0);

  const onToggleActionDropdown = (clusterId: string) => {
    setIsActionDropdownOpen((prev) => ({
      ...prev,
      [clusterId]: !prev[clusterId],
    }));
  };

  const onClusterDrillDown = (clusterId: string) => {
    setSelectedCluster(clusterId);
    setActiveTabKey(1); // Switch to detailed view tab
  };

  const troubleshootingTools = [
    { name: 'Pod Logs', icon: <DatabaseIcon />, description: 'View and search pod logs across clusters' },
    { name: 'Resource Monitor', icon: <ChartLineIcon />, description: 'Real-time resource utilization metrics' },
    { name: 'Network Diagnostics', icon: <NetworkIcon />, description: 'Network connectivity and policy analysis' },
    { name: 'Event Timeline', icon: <MonitoringIcon />, description: 'Cluster events and timeline analysis' },
  ];

  // Overview Tab Content
  const overviewTab = (
    <>
      {/* Key Metrics Cards */}
      <Grid hasGutter>
        <GridItem span={3}>
          <Card>
            <CardTitle>
              <Split hasGutter>
                <SplitItem>
                  <Icon size="lg">
                    <ServerIcon />
                  </Icon>
                </SplitItem>
                <SplitItem isFilled>
                  <Content>
                    <Title headingLevel="h3" size="xl">
                      {totalClusters}
                    </Title>
                    <Content component="small">Total Clusters</Content>
                  </Content>
                </SplitItem>
              </Split>
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={3}>
          <Card>
            <CardTitle>
              <Split hasGutter>
                <SplitItem>
                  <Icon size="lg" status="success">
                    <CheckCircleIcon />
                  </Icon>
                </SplitItem>
                <SplitItem isFilled>
                  <Content>
                    <Title headingLevel="h3" size="xl">
                      {healthyClusters}
                    </Title>
                    <Content component="small">Healthy</Content>
                  </Content>
                </SplitItem>
              </Split>
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={3}>
          <Card>
            <CardTitle>
              <Split hasGutter>
                <SplitItem>
                  <Icon size="lg" status="warning">
                    <ExclamationTriangleIcon />
                  </Icon>
                </SplitItem>
                <SplitItem isFilled>
                  <Content>
                    <Title headingLevel="h3" size="xl">
                      {warningClusters}
                    </Title>
                    <Content component="small">Warning</Content>
                  </Content>
                </SplitItem>
              </Split>
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={3}>
          <Card>
            <CardTitle>
              <Split hasGutter>
                <SplitItem>
                  <Icon size="lg" status="danger">
                    <TimesCircleIcon />
                  </Icon>
                </SplitItem>
                <SplitItem isFilled>
                  <Content>
                    <Title headingLevel="h3" size="xl">
                      {totalIssues}
                    </Title>
                    <Content component="small">Active Issues</Content>
                  </Content>
                </SplitItem>
              </Split>
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>

      {/* Filters and Search */}
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <SearchInput
              placeholder="Search clusters..."
              value={searchValue}
              onChange={(_event, value) => setSearchValue(value)}
              onClear={() => setSearchValue('')}
            />
          </ToolbarItem>
          <ToolbarItem>
            <Select
              id="status-filter"
              isOpen={isStatusFilterOpen}
              selected={statusFilter}
              onSelect={(_event, selection) => {
                setStatusFilter(selection as string);
                setIsStatusFilterOpen(false);
              }}
              onOpenChange={(isOpen) => setIsStatusFilterOpen(isOpen)}
              toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                <MenuToggle ref={toggleRef} onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}>
                  <FilterIcon /> Status: {statusFilter || 'All'}
                </MenuToggle>
              )}
            >
              <SelectOption value="">All Statuses</SelectOption>
              <SelectOption value="healthy">Healthy</SelectOption>
              <SelectOption value="warning">Warning</SelectOption>
              <SelectOption value="critical">Critical</SelectOption>
            </Select>
          </ToolbarItem>
          <ToolbarItem>
            <Select
              id="region-filter"
              isOpen={isRegionFilterOpen}
              selected={regionFilter}
              onSelect={(_event, selection) => {
                setRegionFilter(selection as string);
                setIsRegionFilterOpen(false);
              }}
              onOpenChange={(isOpen) => setIsRegionFilterOpen(isOpen)}
              toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                <MenuToggle ref={toggleRef} onClick={() => setIsRegionFilterOpen(!isRegionFilterOpen)}>
                  Region: {regionFilter || 'All'}
                </MenuToggle>
              )}
            >
              <SelectOption value="">All Regions</SelectOption>
              <SelectOption value="us-east-1">US East 1</SelectOption>
              <SelectOption value="us-west-1">US West 1</SelectOption>
              <SelectOption value="us-central-1">US Central 1</SelectOption>
              <SelectOption value="eu-west-1">EU West 1</SelectOption>
            </Select>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      {/* Cluster Table */}
      <Card>
        <CardBody>
          <Table aria-label="Clusters table" variant="compact">
            <Thead>
              <Tr>
                <Th screenReaderText="Row expansion" />
                <Th>Cluster</Th>
                <Th>Status</Th>
                <Th>CPU</Th>
                <Th>Memory</Th>
                <Th>Issues</Th>
                <Th>Last Updated</Th>
                <Th>Region</Th>
                <Th></Th>
              </Tr>
            </Thead>
            {filteredClusters.map((cluster, rowIndex) => (
              <Tbody key={cluster.id} isExpanded={isClusterExpanded(cluster)}>
                <Tr>
                  <Td
                    expand={{
                      rowIndex,
                      isExpanded: isClusterExpanded(cluster),
                      onToggle: () => setClusterExpanded(cluster, !isClusterExpanded(cluster)),
                      expandId: 'cluster-expandable-table',
                    }}
                  />
                  <Td dataLabel="Cluster">
                    <Split hasGutter>
                      <SplitItem>{getStatusIcon(cluster.status)}</SplitItem>
                      <SplitItem>
                        <Button
                          variant="link"
                          isInline
                          onClick={(e) => {
                            e.stopPropagation();
                            onClusterDrillDown(cluster.id);
                          }}
                        >
                          <strong>{cluster.name}</strong>
                        </Button>
                      </SplitItem>
                    </Split>
                  </Td>
                  <Td dataLabel="Status">
                    <Label
                      color={cluster.status === 'healthy' ? 'green' : cluster.status === 'warning' ? 'orange' : 'red'}
                      variant="filled"
                    >
                      {cluster.status.charAt(0).toUpperCase() + cluster.status.slice(1)}
                    </Label>
                  </Td>
                  <Td dataLabel="CPU">
                    <Split hasGutter>
                      <SplitItem>
                        <Progress
                          value={cluster.cpu}
                          size={ProgressSize.sm}
                          variant={
                            cluster.cpu > 80
                              ? ProgressVariant.danger
                              : cluster.cpu > 60
                                ? ProgressVariant.warning
                                : ProgressVariant.success
                          }
                          style={{ width: '60px' }}
                        />
                      </SplitItem>
                    </Split>
                  </Td>
                  <Td dataLabel="Memory">
                    <Split hasGutter>
                      <SplitItem>
                        <Progress
                          value={cluster.memory}
                          size={ProgressSize.sm}
                          variant={
                            cluster.memory > 80
                              ? ProgressVariant.danger
                              : cluster.memory > 60
                                ? ProgressVariant.warning
                                : ProgressVariant.success
                          }
                          style={{ width: '60px' }}
                        />
                      </SplitItem>
                    </Split>
                  </Td>
                  <Td dataLabel="Issues">
                    {cluster.issues > 0 ? <Badge isRead={false}>{cluster.issues}</Badge> : <span>—</span>}
                  </Td>
                  <Td dataLabel="Last Updated">
                    <Content component="small">{cluster.lastUpdated}</Content>
                  </Td>
                  <Td dataLabel="Region">
                    <Badge>{cluster.region}</Badge>
                  </Td>
                  <Td isActionCell>
                    <Dropdown
                      isOpen={isActionDropdownOpen[cluster.id] || false}
                      onOpenChange={(isOpen: boolean) =>
                        setIsActionDropdownOpen((prev) => ({ ...prev, [cluster.id]: isOpen }))
                      }
                      popperProps={{ position: 'right' }}
                      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                        <MenuToggle
                          ref={toggleRef}
                          variant="plain"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleActionDropdown(cluster.id);
                          }}
                          aria-label={`Actions for ${cluster.name}`}
                        >
                          <EllipsisVIcon />
                        </MenuToggle>
                      )}
                    >
                      <DropdownList>
                        <DropdownItem
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('View details', cluster.id);
                          }}
                        >
                          View Details
                        </DropdownItem>
                        <DropdownItem
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('View logs', cluster.id);
                          }}
                        >
                          View Logs
                        </DropdownItem>
                        <DropdownItem
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Manage', cluster.id);
                          }}
                        >
                          Manage Cluster
                        </DropdownItem>
                        <Divider />
                        <DropdownItem
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Troubleshoot', cluster.id);
                          }}
                        >
                          Troubleshoot
                        </DropdownItem>
                      </DropdownList>
                    </Dropdown>
                  </Td>
                </Tr>
                <Tr isExpanded={isClusterExpanded(cluster)}>
                  <Td />
                  <Td dataLabel="Health & Details" colSpan={3}>
                    <ExpandableRowContent>
                      <DescriptionList>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Health Score</DescriptionListTerm>
                          <DescriptionListDescription>
                            <Progress
                              value={cluster.health}
                              size={ProgressSize.sm}
                              measureLocation={ProgressMeasureLocation.outside}
                              variant={getProgressVariant(cluster.status)}
                            />
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Total Nodes</DescriptionListTerm>
                          <DescriptionListDescription>{cluster.nodes}</DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Node Status</DescriptionListTerm>
                          <DescriptionListDescription>
                            <Label color="green">Ready: {Math.floor(cluster.nodes * 0.9)}</Label>{' '}
                            <Label color="orange">NotReady: {cluster.nodes - Math.floor(cluster.nodes * 0.9)}</Label>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      </DescriptionList>
                    </ExpandableRowContent>
                  </Td>
                  <Td dataLabel="Pods" colSpan={5}>
                    <ExpandableRowContent>
                      <DescriptionList>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Total Pods</DescriptionListTerm>
                          <DescriptionListDescription>{cluster.pods}</DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Pod Status</DescriptionListTerm>
                          <DescriptionListDescription>
                            <Label color="green">Running: {Math.floor(cluster.pods * 0.85)}</Label>{' '}
                            <Label color="blue">Pending: {Math.floor(cluster.pods * 0.1)}</Label>{' '}
                            <Label color="red">
                              Failed: {cluster.pods - Math.floor(cluster.pods * 0.85) - Math.floor(cluster.pods * 0.1)}
                            </Label>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      </DescriptionList>
                    </ExpandableRowContent>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
          {filteredClusters.length === 0 && (
            <EmptyState titleText="No clusters found">
              <EmptyStateBody>Try adjusting your search or filter criteria to find clusters.</EmptyStateBody>
            </EmptyState>
          )}
        </CardBody>
      </Card>

      {/* Top Issues */}
      <Card>
        <CardTitle>
          <Title headingLevel="h2" size="lg">
            <Icon>
              <BellIcon />
            </Icon>{' '}
            Top Issues & Anomalies
          </Title>
        </CardTitle>
        <CardBody>
          {topIssues.length === 0 ? (
            <EmptyState titleText="No active issues">
              <EmptyStateBody>All clusters are running smoothly with no active issues detected.</EmptyStateBody>
            </EmptyState>
          ) : (
            <List isPlain>
              {topIssues.map((issue) => (
                <ListItem key={issue.id}>
                  <Split hasGutter>
                    <SplitItem>{getSeverityIcon(issue.severity)}</SplitItem>
                    <SplitItem isFilled>
                      <Content>
                        <strong>{issue.message}</strong>
                        <br />
                        <Content component="small">
                          {issue.cluster} • {issue.affected} • {issue.timestamp}
                        </Content>
                      </Content>
                    </SplitItem>
                    <SplitItem>
                      <Button variant="link" size="sm">
                        Investigate <ExternalLinkAltIcon />
                      </Button>
                    </SplitItem>
                  </Split>
                </ListItem>
              ))}
            </List>
          )}
        </CardBody>
      </Card>
    </>
  );

  // Detailed View Tab Content
  const detailedViewTab = (
    <>
      {selectedCluster ? (
        <Grid hasGutter>
          <GridItem span={12}>
            <Card>
              <CardTitle>
                <Split hasGutter>
                  <SplitItem>
                    <Button variant="link" onClick={() => setSelectedCluster(null)}>
                      ← Back to Overview
                    </Button>
                  </SplitItem>
                  <SplitItem isFilled>
                    <Title headingLevel="h2" size="xl">
                      {clusterData.find((c) => c.id === selectedCluster)?.name} - Detailed View
                    </Title>
                  </SplitItem>
                </Split>
              </CardTitle>
              <CardBody>
                <Content>Detailed cluster information, metrics, and node-level data would be displayed here.</Content>
                <Content component="p">This view would include:</Content>
                <List>
                  <ListItem>Node-level health and resource utilization</ListItem>
                  <ListItem>Pod distribution and status</ListItem>
                  <ListItem>Network topology and policies</ListItem>
                  <ListItem>Storage and persistent volume information</ListItem>
                  <ListItem>Real-time metrics and historical trends</ListItem>
                </List>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      ) : (
        <EmptyState titleText="Select a cluster to view details">
          <EmptyStateBody>Click on a cluster from the overview to see detailed information.</EmptyStateBody>
        </EmptyState>
      )}
    </>
  );

  // Logs Tab Content
  const logsTab = (
    <Card>
      <CardTitle>
        <Title headingLevel="h2" size="lg">
          Cluster Logs
        </Title>
      </CardTitle>
      <CardBody>
        <Content>
          <List>
            {logs.map((log) => (
              <ListItem key={log.id}>
                <Split hasGutter>
                  <SplitItem>
                    <Label color={log.level === 'ERROR' ? 'red' : log.level === 'WARN' ? 'orange' : 'blue'}>
                      {log.level}
                    </Label>
                  </SplitItem>
                  <SplitItem>
                    <Content component="small">{log.timestamp}</Content>
                  </SplitItem>
                  <SplitItem>
                    <Badge>{log.cluster}</Badge>
                  </SplitItem>
                  <SplitItem isFilled>
                    <Content>
                      <strong>{log.component}:</strong> {log.message}
                    </Content>
                  </SplitItem>
                  <SplitItem>
                    <Button variant="link" size="sm">
                      View Full Log
                    </Button>
                  </SplitItem>
                </Split>
              </ListItem>
            ))}
          </List>
        </Content>
      </CardBody>
    </Card>
  );

  // Troubleshooting Tab Content
  const troubleshootingTab = (
    <>
      <PageSection>
        <Title headingLevel="h2" size="lg">
          Troubleshooting Tools
        </Title>
        <Gallery hasGutter minWidths={{ default: '250px' }} style={{ marginTop: 'var(--pf-v6-global--spacer--md)' }}>
          {troubleshootingTools.map((tool, index) => (
            <Card key={index} isClickable>
              <CardTitle>
                <Split hasGutter>
                  <SplitItem>
                    <Icon size="lg">{tool.icon}</Icon>
                  </SplitItem>
                  <SplitItem isFilled>
                    <Title headingLevel="h3" size="md">
                      {tool.name}
                    </Title>
                  </SplitItem>
                </Split>
              </CardTitle>
              <CardBody>
                <Content component="p">{tool.description}</Content>
                <Button variant="primary" size="sm" style={{ marginTop: 'var(--pf-v6-global--spacer--sm)' }}>
                  Launch Tool
                </Button>
              </CardBody>
            </Card>
          ))}
        </Gallery>
      </PageSection>

      <PageSection>
        <Title headingLevel="h3" size="lg">
          Quick Actions
        </Title>
        <Flex spaceItems={{ default: 'spaceItemsSm' }} style={{ marginTop: 'var(--pf-v6-global--spacer--md)' }}>
          <FlexItem>
            <Button variant="secondary">Run Diagnostics</Button>
          </FlexItem>
          <FlexItem>
            <Button variant="secondary">Export Cluster State</Button>
          </FlexItem>
          <FlexItem>
            <Button variant="secondary">Generate Support Bundle</Button>
          </FlexItem>
          <FlexItem>
            <Button variant="tertiary">View Documentation</Button>
          </FlexItem>
        </Flex>
      </PageSection>
    </>
  );

  return (
    <PageSection hasBodyWrapper={false}>
      <Split hasGutter style={{ marginBottom: 'var(--pf-v6-global--spacer--lg)' }}>
        <SplitItem isFilled>
          <Title headingLevel="h1" size="2xl">
            Cluster Health & Troubleshooting Dashboard
          </Title>
          <Content component="p">Monitor, identify, and troubleshoot issues across all your clusters</Content>
        </SplitItem>
        <SplitItem>
          <Button variant="primary">
            <Icon>
              <SearchIcon />
            </Icon>{' '}
            Global Search
          </Button>
        </SplitItem>
      </Split>

      <Tabs
        activeKey={activeTabKey}
        onSelect={(_event, tabIndex) => setActiveTabKey(tabIndex)}
        aria-label="Dashboard tabs"
      >
        <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} aria-label="Overview tab">
          <TabContent id="overview-tab-content">
            <TabContentBody>
              <div style={{ padding: 'var(--pf-v6-global--spacer--lg)' }}>{overviewTab}</div>
            </TabContentBody>
          </TabContent>
        </Tab>
        <Tab eventKey={1} title={<TabTitleText>Detailed View</TabTitleText>} aria-label="Detailed view tab">
          <TabContent id="detailed-view-tab-content">
            <TabContentBody>
              <div style={{ padding: 'var(--pf-v6-global--spacer--lg)' }}>{detailedViewTab}</div>
            </TabContentBody>
          </TabContent>
        </Tab>
        <Tab eventKey={2} title={<TabTitleText>Logs</TabTitleText>} aria-label="Logs tab">
          <TabContent id="logs-tab-content">
            <TabContentBody>
              <div style={{ padding: 'var(--pf-v6-global--spacer--lg)' }}>{logsTab}</div>
            </TabContentBody>
          </TabContent>
        </Tab>
        <Tab eventKey={3} title={<TabTitleText>Troubleshooting</TabTitleText>} aria-label="Troubleshooting tab">
          <TabContent id="troubleshooting-tab-content">
            <TabContentBody>
              <div style={{ padding: 'var(--pf-v6-global--spacer--lg)' }}>{troubleshootingTab}</div>
            </TabContentBody>
          </TabContent>
        </Tab>
      </Tabs>
    </PageSection>
  );
};

export { Dashboard };
