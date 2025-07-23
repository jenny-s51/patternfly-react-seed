import { clusterData, criticalIssues, logs } from './test-data/cluster-data';
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
  ChartLineIcon,
  CheckCircleIcon,
  CubesIcon,
  DatabaseIcon,
  EllipsisVIcon,
  ExclamationTriangleIcon,
  ExternalLinkAltIcon,
  FilterIcon,
  HeartbeatIcon,
  InfoCircleIcon,
  MonitoringIcon,
  NetworkIcon,
  SearchIcon,
  TimesCircleIcon,
} from '@patternfly/react-icons';

type Demo = {
  id: string;
  name: string;
  props?: { [key: string]: any };
  fullPageOnly?: boolean;
};

const demos: Demo[] = [
  {
    id: 'dashboard-demo',
    name: 'Dashboard Demo',
  },
];

const podStatusData = [
  {
    name: 'Running',
    count: 350,
  },
  {
    name: 'Pending',
    count: 20,
  },
  {
    name: 'Failed',
    count: 5,
  },
  {
    name: 'Succeeded',
    count: 100,
  },
];

const getProgressVariant = (status) => {
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

const Dashboard: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [isStatusFilterOpen, setIsStatusFilterOpen] = React.useState(false);
  const [regionFilter, setRegionFilter] = React.useState('');
  const [isRegionFilterOpen, setIsRegionFilterOpen] = React.useState(false);
  const [selectedCluster, setSelectedCluster] = React.useState<string | null>(null);
  const [isActionDropdownOpen, setIsActionDropdownOpen] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [expandedClusterNames, setExpandedClusterNames] = React.useState<string[]>([]);
  const setClusterExpanded = (cluster: (typeof clusterData)[0], isExpanding = true) =>
    setExpandedClusterNames((prevExpanded) => {
      const otherExpandedClusterNames = prevExpanded.filter((n) => n !== cluster.name);
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
                    <CubesIcon />
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
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Issues</Th>
                <Th>Region</Th>
                <Th>Version</Th>
                <Th />
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
                      expandId: `expandable-cluster-row-${cluster.id}`,
                    }}
                  />
                  <Td dataLabel="Name">
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
                  </Td>
                  <Td dataLabel="Status">
                    <Label
                      color={cluster.status === 'healthy' ? 'green' : cluster.status === 'warning' ? 'orange' : 'red'}
                      variant="filled"
                    >
                      {cluster.status.charAt(0).toUpperCase() + cluster.status.slice(1)}
                    </Label>
                  </Td>
                  <Td dataLabel="Issues">
                    {cluster.issues > 0 ? <Badge isRead={false}>{cluster.issues}</Badge> : <span>—</span>}
                  </Td>
                  <Td dataLabel="Region">{cluster.region}</Td>
                  <Td dataLabel="Version">{cluster.version}</Td>
                  <Td dataLabel="Actions" isActionCell>
                    <Dropdown
                      isOpen={isActionDropdownOpen[cluster.id] || false}
                      onSelect={() => onToggleActionDropdown(cluster.id)}
                      onOpenChange={(isOpen: boolean) =>
                        setIsActionDropdownOpen((prev) => ({ ...prev, [cluster.id]: isOpen }))
                      }
                      popperProps={{ position: 'right', appendTo: () => document.body }}
                      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                        <MenuToggle
                          ref={toggleRef}
                          isExpanded={isActionDropdownOpen[cluster.id]}
                          onClick={() => onToggleActionDropdown(cluster.id)}
                          variant="plain"
                          aria-label={`${cluster.name} actions`}
                        >
                          <EllipsisVIcon />
                        </MenuToggle>
                      )}
                    >
                      <DropdownList>
                        <DropdownItem key="action-details" onClick={() => onClusterDrillDown(cluster.id)}>
                          View Details
                        </DropdownItem>
                        <DropdownItem key="action-scale">Scale Cluster</DropdownItem>
                        <DropdownItem key="action-reboot">Reboot Nodes</DropdownItem>
                        <DropdownItem key="action-delete">Delete Cluster</DropdownItem>
                      </DropdownList>
                    </Dropdown>
                  </Td>
                </Tr>
                <Tr isExpanded={isClusterExpanded(cluster)}>
                  <Td />
                  <Td dataLabel="Health" colSpan={3}>
                    <ExpandableRowContent>
                      <DescriptionList>
                        <DescriptionListGroup>
                          <DescriptionListTerm>
                            <Icon>
                              <HeartbeatIcon />
                            </Icon>{' '}
                            Health
                          </DescriptionListTerm>
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
                          <DescriptionListTerm>Uptime</DescriptionListTerm>
                          <DescriptionListDescription>{cluster.uptime}</DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Last Check-in</DescriptionListTerm>
                          <DescriptionListDescription>{cluster.lastCheckin}</DescriptionListDescription>
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
                              measureLocation={ProgressMeasureLocation.outside}
                              variant={
                                cluster.cpu > 90
                                  ? ProgressVariant.danger
                                  : cluster.cpu > 75
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
                              measureLocation={ProgressMeasureLocation.outside}
                              variant={
                                cluster.memory > 90
                                  ? ProgressVariant.danger
                                  : cluster.memory > 75
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
                            <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                              {podStatusData.map((pod, i) => (
                                <FlexItem key={i}>
                                  <strong>{pod.count}</strong> {pod.name}
                                </FlexItem>
                              ))}
                            </Flex>
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
      {/* Critical Issues Card */}
      <Card>
        <CardTitle>
          <Title headingLevel="h2" size="lg">
            Critical Issues
          </Title>
        </CardTitle>
        <CardBody>
          {criticalIssues.length > 0 ? (
            <List isPlain>
              {criticalIssues.map((issue) => (
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
          ) : (
            <EmptyState titleText="No critical issues" />
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
                  <SplitItem isFilled>
                    <Title headingLevel="h2" size="xl">
                      {selectedCluster}
                    </Title>
                  </SplitItem>
                  <SplitItem>
                    <Button variant="link" onClick={() => setActiveTabKey(0)}>
                      Back to Overview
                    </Button>
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
          {/* Add more detailed cards for metrics, nodes, etc. */}
        </Grid>
      ) : (
        <EmptyState titleText="No cluster selected">
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
                  <SplitItem>{getSeverityIcon(log.severity)}</SplitItem>
                  <SplitItem isFilled>
                    <Content>
                      <strong>
                        [{log.timestamp}] [{log.cluster}] [{log.source}]
                      </strong>{' '}
                      {log.message}
                    </Content>
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
