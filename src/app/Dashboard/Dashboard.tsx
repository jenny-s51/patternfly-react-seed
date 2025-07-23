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
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
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
  Stack,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Tabs,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
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

  // Use semantic design tokens instead of hardcoded colors
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return (
          <Icon status="success">
            <CheckCircleIcon />
          </Icon>
        );
      case 'warning':
        return (
          <Icon status="warning">
            <ExclamationTriangleIcon />
          </Icon>
        );
      case 'critical':
        return (
          <Icon status="danger">
            <TimesCircleIcon />
          </Icon>
        );
      default:
        return (
          <Icon>
            <InfoCircleIcon />
          </Icon>
        );
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
        return (
          <Icon status="danger">
            <TimesCircleIcon />
          </Icon>
        );
      case 'warning':
        return (
          <Icon status="warning">
            <ExclamationTriangleIcon />
          </Icon>
        );
      case 'info':
        return (
          <Icon status="info">
            <InfoCircleIcon />
          </Icon>
        );
      default:
        return (
          <Icon>
            <InfoCircleIcon />
          </Icon>
        );
    }
  };

  const filteredClusters = React.useMemo(() => {
    return clusterData.filter((cluster) => {
      const matchesSearch = cluster.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = !statusFilter || cluster.status === statusFilter;
      const matchesRegion = !regionFilter || cluster.region === regionFilter;
      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [searchValue, statusFilter, regionFilter]);

  const totalClusters = clusterData.length;
  const healthyClusters = clusterData.filter((c) => c.status === 'healthy').length;
  const warningClusters = clusterData.filter((c) => c.status === 'warning').length;
  const totalIssues = clusterData.reduce((sum, cluster) => sum + cluster.issues, 0);

  const onToggleActionDropdown = React.useCallback((clusterId: string) => {
    setIsActionDropdownOpen((prev) => ({
      ...prev,
      [clusterId]: !prev[clusterId],
    }));
  }, []);

  const onClusterDrillDown = React.useCallback((clusterId: string) => {
    setSelectedCluster(clusterId);
    setActiveTabKey(1); // Switch to detailed view tab
  }, []);

  const onClearFilters = React.useCallback(() => {
    setSearchValue('');
    setStatusFilter('');
    setRegionFilter('');
  }, []);

  const troubleshootingTools = [
    {
      name: 'Pod Logs',
      icon: <DatabaseIcon />,
      description: 'View and search pod logs across clusters',
    },
    {
      name: 'Resource Monitor',
      icon: <ChartLineIcon />,
      description: 'Real-time resource utilization metrics',
    },
    {
      name: 'Network Diagnostics',
      icon: <NetworkIcon />,
      description: 'Network connectivity and policy analysis',
    },
    {
      name: 'Event Timeline',
      icon: <MonitoringIcon />,
      description: 'Cluster events and timeline analysis',
    },
  ];

  // Overview Tab Content using proper component composition
  const overviewTab = (
    <Stack hasGutter>
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
                  <Stack>
                    <Title headingLevel="h3" size="xl">
                      {totalClusters}
                    </Title>
                    <Content component="small">Total Clusters</Content>
                  </Stack>
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
                  <Stack>
                    <Title headingLevel="h3" size="xl">
                      {healthyClusters}
                    </Title>
                    <Content component="small">Healthy</Content>
                  </Stack>
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
                  <Stack>
                    <Title headingLevel="h3" size="xl">
                      {warningClusters}
                    </Title>
                    <Content component="small">Warning</Content>
                  </Stack>
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
                  <Stack>
                    <Title headingLevel="h3" size="xl">
                      {totalIssues}
                    </Title>
                    <Content component="small">Active Issues</Content>
                  </Stack>
                </SplitItem>
              </Split>
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>

      {/* Filters and Search using proper Toolbar patterns */}
      <Toolbar
        clearAllFilters={onClearFilters}
        clearFiltersButtonText="Clear all filters"
        collapseListedFiltersBreakpoint="xl"
      >
        <ToolbarContent>
          <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
            <ToolbarGroup>
              <ToolbarItem>
                <SearchInput
                  placeholder="Search clusters..."
                  value={searchValue}
                  onChange={(_event, value) => setSearchValue(value)}
                  onClear={() => setSearchValue('')}
                  aria-label="Search clusters"
                />
              </ToolbarItem>
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarFilter
                labels={statusFilter ? [statusFilter] : []}
                deleteLabel={() => setStatusFilter('')}
                deleteLabelGroup={() => setStatusFilter('')}
                categoryName="Status"
              >
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
                      <Icon>
                        <FilterIcon />
                      </Icon>{' '}
                      Status: {statusFilter || 'All'}
                    </MenuToggle>
                  )}
                  aria-label="Filter by status"
                >
                  <SelectOption value="">All Statuses</SelectOption>
                  <SelectOption value="healthy">Healthy</SelectOption>
                  <SelectOption value="warning">Warning</SelectOption>
                  <SelectOption value="critical">Critical</SelectOption>
                </Select>
              </ToolbarFilter>
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarFilter
                labels={regionFilter ? [regionFilter] : []}
                deleteLabel={() => setRegionFilter('')}
                deleteLabelGroup={() => setRegionFilter('')}
                categoryName="Region"
              >
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
                  aria-label="Filter by region"
                >
                  <SelectOption value="">All Regions</SelectOption>
                  <SelectOption value="us-east-1">US East 1</SelectOption>
                  <SelectOption value="us-west-1">US West 1</SelectOption>
                  <SelectOption value="us-central-1">US Central 1</SelectOption>
                  <SelectOption value="eu-west-1">EU West 1</SelectOption>
                </Select>
              </ToolbarFilter>
            </ToolbarGroup>
          </ToolbarToggleGroup>
        </ToolbarContent>
      </Toolbar>

      {/* Cluster Table */}
      <Card>
        <CardBody>
          <Table aria-label="Expandable clusters table" variant="compact">
            <Thead>
              <Tr>
                <Th screenReaderText="Row expansion" />
                <Th>Cluster</Th>
                <Th>Status</Th>
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
                          aria-label={`View details for ${cluster.name}`}
                        >
                          <strong>{cluster.name}</strong>
                        </Button>
                      </SplitItem>
                    </Split>
                  </Td>
                  <Td dataLabel="Status">
                    <Label
                      color={
                        cluster.status === 'healthy' ? 'green' : cluster.status === 'warning' ? 'orange' : 'red'
                      }
                      variant="filled"
                    >
                      {cluster.status.charAt(0).toUpperCase() + cluster.status.slice(1)}
                    </Label>
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
                      popperProps={{ position: 'right', appendTo: () => document.body }}
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
                              aria-label={`Health score: ${cluster.health}%`}
                            />
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Total Nodes</DescriptionListTerm>
                          <DescriptionListDescription>{cluster.nodes}</DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Total Pods</DescriptionListTerm>
                          <DescriptionListDescription>{cluster.pods}</DescriptionListDescription>
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
                  <Td dataLabel="Resource Usage" colSpan={3}>
                    <ExpandableRowContent>
                      <DescriptionList>
                        <DescriptionListGroup>
                          <DescriptionListTerm>CPU</DescriptionListTerm>
                          <DescriptionListDescription>
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
                              aria-label={`CPU usage: ${cluster.cpu}%`}
                            />
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Memory</DescriptionListTerm>
                          <DescriptionListDescription>
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
                              aria-label={`Memory usage: ${cluster.memory}%`}
                            />
                          </DescriptionListDescription>
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
              <EmptyStateFooter>
                <EmptyStateActions>
                  <Button variant="primary" onClick={onClearFilters}>
                    Clear filters
                  </Button>
                </EmptyStateActions>
              </EmptyStateFooter>
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
                      <Stack>
                        <Content>
                          <strong>{issue.message}</strong>
                        </Content>
                        <Content component="small">
                          {issue.cluster} • {issue.affected} • {issue.timestamp}
                        </Content>
                      </Stack>
                    </SplitItem>
                    <SplitItem>
                      <Button
                        variant="link"
                        size="sm"
                        component="a"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={<ExternalLinkAltIcon />}
                        iconPosition="right"
                      >
                        Investigate
                      </Button>
                    </SplitItem>
                  </Split>
                </ListItem>
              ))}
            </List>
          )}
        </CardBody>
      </Card>
    </Stack>
  );

  // Detailed View Tab Content
  const detailedViewTab = (
    <Stack hasGutter>
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
                <Stack hasGutter>
                  <Content>Detailed cluster information, metrics, and node-level data would be displayed here.</Content>
                  <Content component="p">This view would include:</Content>
                  <List>
                    <ListItem>Node-level health and resource utilization</ListItem>
                    <ListItem>Pod distribution and status</ListItem>
                    <ListItem>Network topology and policies</ListItem>
                    <ListItem>Storage and persistent volume information</ListItem>
                    <ListItem>Real-time metrics and historical trends</ListItem>
                  </List>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      ) : (
        <EmptyState>
          <EmptyStateHeader titleText="Select a cluster to view details" headingLevel="h2" />
          <EmptyStateBody>Click on a cluster from the overview to see detailed information.</EmptyStateBody>
        </EmptyState>
      )}
    </Stack>
  );

  // Logs Tab Content
  const logsTab = (
    <Stack hasGutter>
      <Card>
        <CardTitle>
          <Title headingLevel="h2" size="lg">
            Cluster Logs
          </Title>
        </CardTitle>
        <CardBody>
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
        </CardBody>
      </Card>
    </Stack>
  );

  // Troubleshooting Tab Content
  const troubleshootingTab = (
    <Stack hasGutter>
      <PageSection>
        <Title headingLevel="h2" size="lg">
          Troubleshooting Tools
        </Title>
        <Gallery hasGutter minWidths={{ default: '250px' }} className="pf-v6-u-mt-md">
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
                <Stack hasGutter>
                  <Content component="p">{tool.description}</Content>
                  <Button variant="primary" size="sm">
                    Launch Tool
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Gallery>
      </PageSection>

      <PageSection>
        <Stack hasGutter>
          <Title headingLevel="h3" size="lg">
            Quick Actions
          </Title>
          <Flex spaceItems={{ default: 'spaceItemsSm' }} className="pf-v6-u-mt-md">
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
        </Stack>
      </PageSection>
    </Stack>
  );

  return (
    <PageSection hasBodyWrapper={false}>
      <Stack hasGutter className="pf-v6-u-mb-lg">
        <Split hasGutter>
          <SplitItem isFilled>
            <Stack>
              <Title headingLevel="h1" size="2xl">
                Cluster Health & Troubleshooting Dashboard
              </Title>
              <Content component="p">Monitor, identify, and troubleshoot issues across all your clusters</Content>
            </Stack>
          </SplitItem>
          <SplitItem>
            <Button variant="primary" icon={<SearchIcon />} iconPosition="left">
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
              <TabContentBody className="pf-v6-u-p-lg">{overviewTab}</TabContentBody>
            </TabContent>
          </Tab>
          <Tab eventKey={1} title={<TabTitleText>Detailed View</TabTitleText>} aria-label="Detailed view tab">
            <TabContent id="detailed-view-tab-content">
              <TabContentBody className="pf-v6-u-p-lg">{detailedViewTab}</TabContentBody>
            </TabContent>
          </Tab>
          <Tab eventKey={2} title={<TabTitleText>Logs</TabTitleText>} aria-label="Logs tab">
            <TabContent id="logs-tab-content">
              <TabContentBody className="pf-v6-u-p-lg">{logsTab}</TabContentBody>
            </TabContent>
          </Tab>
          <Tab eventKey={3} title={<TabTitleText>Troubleshooting</TabTitleText>} aria-label="Troubleshooting tab">
            <TabContent id="troubleshooting-tab-content">
              <TabContentBody className="pf-v6-u-p-lg">{troubleshootingTab}</TabContentBody>
            </TabContent>
          </Tab>
        </Tabs>
      </Stack>
    </PageSection>
  );
};

export { Dashboard };
