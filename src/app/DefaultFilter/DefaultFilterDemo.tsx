import React from 'react';
import {
  Badge,
  Button,
  Bullseye,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateHeader,
  EmptyStateFooter,
  Label,
  MenuToggle,
  MenuToggleElement,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarFilter,
  ToolbarToggleGroup,
  ToolbarGroup,
  Title,
  Select,
  SelectOption,
  SearchInput,
  PageSection,
  MenuContainer,
  Panel,
  PanelMain,
  PanelMainBody,
  TreeView,
  TreeViewDataItem,
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { Table, TableText, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { columns, rows } from '../data';

export const DefaultFilterDemo: React.FunctionComponent = () => {
  const [filters, setFilters] = React.useState<{
    name: string[];
    status: string[];
    operatingSystem: string[];
    dataCollector: string[];
    rhcStatus: string[];
    systemUpdateMethod: string[];
    lastSeen: string[];
    tags: string[];
  }>({
    name: [],
    status: [],
    operatingSystem: [],
    dataCollector: [],
    rhcStatus: [],
    systemUpdateMethod: [],
    lastSeen: [],
    tags: [],
  });
  const [currentCategory, setCurrentCategory] = React.useState('Name');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = React.useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = React.useState(false);
  const [nameInput, setNameInput] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [tableRows, setTableRows] = React.useState(rows.slice(0, 10));
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>();
  const [checkedItems, setCheckedItems] = React.useState<TreeViewDataItem[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  console.log('filters', filters);

  const onDelete = (type = '', id = '') => {
    console.log('ID', id);
    console.log('type', type);
    if (type) {
      filters[type] = filters[type].filter((s) => s !== id);
      return {
        filters: filters,
      };
    } else {
      setFilters({
        name: [],
        status: [],
        operatingSystem: [],
        dataCollector: [],
        rhcStatus: [],
        systemUpdateMethod: [],
        lastSeen: [],
        tags: [],
      });
    }
  };

  const onCategoryToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const onCategorySelect = (event) => {
    console.log('HEY', event.target.innerText);
    setCurrentCategory(event.target.innerText);
    setIsCategoryDropdownOpen(false);
  };

  const onFilterToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const onFilterSelect = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const onInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const onNameInput = (event) => {
    if (event.key && event.key !== 'Enter') {
      return;
    }

    setFilters({ ...filters, name: filters.name.includes(inputValue) ? filters.name : [...filters.name, inputValue] });
    setInputValue('');
  };

  const onStatusSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      status: checked
        ? [...filters.status, selection]
        : Object.values(filters.status).filter((value) => value !== selection),
    });
    setIsFilterDropdownOpen(false);
  };

  const onOSSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      operatingSystem: checked
        ? [selection]
        : Object.values(filters.operatingSystem).filter((value) => value !== selection),
    });
    setIsFilterDropdownOpen(false);
  };

  const onSystemUpdateMethodSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      systemUpdateMethod: checked
        ? [selection]
        : Object.values(filters.systemUpdateMethod).filter((value) => value !== selection),
    });
    setIsFilterDropdownOpen(false);
  };

  const onRHCStatusSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      rhcStatus: checked ? [selection] : Object.values(filters.rhcStatus).filter((value) => value !== selection),
    });
    setIsFilterDropdownOpen(false);
  };

  const onLastSeenSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      lastSeen: checked
        ? [...filters.lastSeen, selection]
        : Object.values(filters.lastSeen).filter((value) => value !== selection),
    });
    setIsFilterDropdownOpen(false);
  };

  const onDataCollectorSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      dataCollector: checked
        ? [...filters.dataCollector, selection]
        : Object.values(filters).filter((value) => value !== selection),
    });
    setIsFilterDropdownOpen(false);
  };

  const buildCategoryDropdown = () => {
    const categoryMenuItems = [
      <SelectOption key="cat1" value="Name">
        Name
      </SelectOption>,
      <SelectOption key="cat2" value="Status">
        Status
      </SelectOption>,
      <SelectOption key="cat3" value="Operating System">
        Operating system
      </SelectOption>,
      <SelectOption key="cat4" value="Data Collector">
        Data collector
      </SelectOption>,
      <SelectOption key="cat5" value="RHC Status">
        RHC status
      </SelectOption>,
      <SelectOption key="cat6" value="System Update Method">
        System update method
      </SelectOption>,
      <SelectOption key="cat7" value="Last seen">
        Last seen
      </SelectOption>,
      <SelectOption key="cat8" value="Tags">
        Tags
      </SelectOption>,
    ];

    return (
      <ToolbarItem>
        <Select
          onSelect={(e) => onCategorySelect(e)}
          selected={currentCategory}
          toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
            <MenuToggle
              ref={toggleRef}
              onClick={onCategoryToggle}
              isExpanded={isCategoryDropdownOpen}
              icon={<FilterIcon />}
              style={
                {
                  width: '100%',
                  verticalAlign: 'text-bottom',
                } as React.CSSProperties
              }
            >
              {currentCategory}
            </MenuToggle>
          )}
          isOpen={isCategoryDropdownOpen}
        >
          {categoryMenuItems}
        </Select>
      </ToolbarItem>
    );
  };

  const buildFilterDropdown = () => {
    const osOptions: TreeViewDataItem[] = [
      {
        name: 'RHEL 9',
        id: 'ready',
        checkProps: { checked: false },
        children: [
          {
            name: 'RHEL 9.3',
            id: 'RHEL_9.3',
            checkProps: { checked: false },
          },
          {
            name: 'RHEL 9.2',
            id: 'RHEL_9.2',
            checkProps: { checked: false },
          },
          {
            name: 'RHEL 9.1',
            id: 'RHEL_9.1',
            checkProps: { checked: false },
          },
          {
            name: 'RHEL 9.0',
            id: 'RHEL_9.0',
            checkProps: { checked: false },
          },
        ],
      },
      {
        name: 'RHEL 8',
        id: 'nr',
        checkProps: { checked: false },
        children: [
          {
            name: 'RHEL 8.9',
            id: 'RHEL_8.9',
            checkProps: { checked: false },
          },
          {
            name: 'RHEL 8.8',
            id: 'RHEL_8.8',
            checkProps: { checked: false },
          },
          {
            name: 'RHEL 8.7',
            id: 'RHEL_8.7',
            checkProps: { checked: false },
          },
        ],
      },
    ];

    const statusMenuItems = [
      <SelectOption hasCheckbox key="statusFresh" value="Fresh" isSelected={filters.status.includes('Fresh')}>
        Fresh
      </SelectOption>,
      <SelectOption hasCheckbox key="statusStale" value="Stale" isSelected={filters.status.includes('Stale')}>
        Stale
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="statusStaleWarning"
        value="Stale warning"
        isSelected={filters.status.includes('Stale warning')}
      >
        Stale warning
      </SelectOption>,
      <SelectOption hasCheckbox key="statusUnknown" value="Unknown" isSelected={filters.status.includes('Unknown')}>
        Unknown
      </SelectOption>,
    ];

    const dataCollectorMenuItems = [
      <SelectOption
        hasCheckbox
        key="insightsClients"
        value="insights-clients"
        isSelected={filters.dataCollector.includes('Fresh')}
      >
        insights-clients
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="subscriptionManager"
        value="subscription-manager"
        isSelected={filters.dataCollector.includes('Stale')}
      >
        subscription-manager
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="satelliteDiscovery"
        value="Satellite/Discovery"
        isSelected={filters.dataCollector.includes('Satellite/Discovery')}
      >
        Satellite/Discovery
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="notConnected"
        value="insights-client not connected"
        isSelected={filters.dataCollector.includes('insights-client not connected')}
      >
        insights-client not connected
      </SelectOption>,
    ];

    const rhcStatusMenuItems = [
      <SelectOption hasCheckbox key="active" value="Active" isSelected={filters.rhcStatus.includes('Active')}>
        Active
      </SelectOption>,
      <SelectOption hasCheckbox key="inactive" value="Active" isSelected={filters.rhcStatus.includes('Inactive')}>
        Inactive
      </SelectOption>,
    ];

    const systemUpdateMethodMenuItems = [
      <SelectOption
        hasCheckbox
        key="statusFresh"
        value="Fresh"
        isSelected={filters.systemUpdateMethod.includes('Fresh')}
      >
        Fresh
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="statusStale"
        value="Stale"
        isSelected={filters.systemUpdateMethod.includes('Stale')}
      >
        Stale
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="statusStaleWarning"
        value="Stale warning"
        isSelected={filters.systemUpdateMethod.includes('Stale warning')}
      >
        Stale warning
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="statusUnknown"
        value="Unknown"
        isSelected={filters.systemUpdateMethod.includes('Unknown')}
      >
        Unknown
      </SelectOption>,
    ];

    const lastSeenMenuItems = [
      <SelectOption
        hasCheckbox
        key="within24Hrs"
        value="Within the last 24 hours"
        isSelected={filters.lastSeen.includes('Within the last 24 hours')}
      >
        Within the last 24 hours
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="moreThan1Day"
        value="Stale"
        isSelected={filters.lastSeen.includes('More than 1 day ago')}
      >
        More than 1 day ago
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="moreThan7Days"
        value="More than 1 day ago"
        isSelected={filters.lastSeen.includes('More than 7 day ago')}
      >
        More than 7 days ago
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="moreThan15Days"
        value="Unknown"
        isSelected={filters.lastSeen.includes('More than 15 days ago')}
      >
        More than 15 days ago
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="moreThan30Days"
        value="Unknown"
        isSelected={filters.lastSeen.includes('More than 30 days ago')}
      >
        More than 30 days ago
      </SelectOption>,
    ];

    // Helper functions for tree
    const isChecked = (dataItem: TreeViewDataItem) => checkedItems.some((item) => item.id === dataItem.id);
    const areAllDescendantsChecked = (dataItem: TreeViewDataItem) =>
      dataItem.children ? dataItem.children.every((child) => areAllDescendantsChecked(child)) : isChecked(dataItem);
    const areSomeDescendantsChecked = (dataItem: TreeViewDataItem) =>
      dataItem.children ? dataItem.children.some((child) => areSomeDescendantsChecked(child)) : isChecked(dataItem);

    const flattenTree = (tree: TreeViewDataItem[]) => {
      let result: TreeViewDataItem[] = [];
      tree.forEach((item) => {
        result.push(item);
        if (item.children) {
          result = result.concat(flattenTree(item.children));
        }
      });
      return result;
    };

    const mapTree = (item: TreeViewDataItem) => {
      const hasCheck = areAllDescendantsChecked(item);
      item.checkProps = item.checkProps || {};
      // Reset checked properties to be updated
      item.checkProps.checked = false;

      if (hasCheck) {
        item.checkProps.checked = true;
      } else {
        const hasPartialCheck = areSomeDescendantsChecked(item);
        if (hasPartialCheck) {
          item.checkProps.checked = null;
        }
      }

      if (item.children) {
        return {
          ...item,
          children: item.children.map(mapTree),
        };
      }
      return item;
    };

    const onToggleClick = () => {
      setIsOpen(!isOpen);
    };

    const toggle = (
      <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
        {'Filter by operating system'}
      </MenuToggle>
    );

    const osMapped = osOptions.map(mapTree);

    const tagsOptions: TreeViewDataItem[] = [
      {
        name: 'Location',
        id: 'ready',
        checkProps: { checked: false },
        children: [
          {
            name: 'North America',
            // name: 'Satellite',
            id: 'RHEL_9.3',
            checkProps: { checked: false },
          },
          {
            name: 'South America',
            id: 'RHEL_9.2',
            checkProps: { checked: false },
          },
          {
            name: 'Asia',
            id: 'RHEL_9.1',
            checkProps: { checked: false },
          },
        ],
      },
      {
        name: 'Environment',
        id: 'nr',
        checkProps: { checked: false },
        children: [
          {
            name: 'Production',
            // name: 'insights-client',
            id: 'production',
            checkProps: { checked: false },
          },
          {
            // title: 'Preview',
            name: 'Preview',
            id: 'preview',
            checkProps: { checked: false },
          },
          {
            name: 'Staging',
            id: 'staging',
            checkProps: { checked: false },
          },
        ],
      },
    ];

    const filterItems = (item: TreeViewDataItem, checkedItem: TreeViewDataItem) => {
      if (item.id === checkedItem.id) {
        return true;
      }

      if (item.children) {
        return (
          (item.children = item.children
            .map((opt) => Object.assign({}, opt))
            .filter((child) => filterItems(child, checkedItem))).length > 0
        );
      }
    };

    const onCheck = (evt: React.ChangeEvent, treeViewItem: TreeViewDataItem, treeType: string) => {
      const checked = (evt.target as HTMLInputElement).checked;

      let options: TreeViewDataItem[] = [];

      options = osOptions;

      const checkedItemTree = options
        .map((opt) => Object.assign({}, opt))
        .filter((item) => filterItems(item, treeViewItem));
      const flatCheckedItems = flattenTree(checkedItemTree);
      setCheckedItems((prevCheckedItems) =>
        checked
          ? prevCheckedItems.concat(flatCheckedItems.filter((item) => !prevCheckedItems.some((i) => i.id === item.id)))
          : prevCheckedItems.filter((item) => !flatCheckedItems.some((i) => i.id === item.id)),
      );
    };

    const OSmenu = (
      <Panel
        ref={menuRef}
        variant="raised"
        style={{
          width: '400px',
        }}
      >
        <PanelMain>
          <section>
            <PanelMainBody style={{ padding: 0 }}>
              <TreeView
                data={osMapped}
                hasBadges
                defaultAllExpanded
                hasCheckboxes
                onCheck={(event, item) => onCheck(event, item, 'operatingSystem')}
              />
            </PanelMainBody>
          </section>
        </PanelMain>
      </Panel>
    );

    const tagsMapped = tagsOptions.map(mapTree);
    const tagsMenu = (
      <Panel
        ref={menuRef}
        variant="raised"
        style={{
          width: '400px',
        }}
      >
        <PanelMain>
          <section>
            <PanelMainBody style={{ padding: 0 }}>
              <TreeView
                data={tagsMapped}
                defaultAllExpanded
                hasBadges
                hasCheckboxes
                onCheck={(event, item) => onCheck(event, item, 'tags')}
              />
            </PanelMainBody>
          </section>
        </PanelMain>
      </Panel>
    );

    return (
      <React.Fragment>
        <ToolbarFilter
          chips={filters.name}
          deleteChip={() => onDelete('name')}
          categoryName="Name"
          showToolbarItem={currentCategory === 'Name'}
        >
          <SearchInput
            aria-label="name filter"
            placeholder="Filter by name..."
            onChange={(_event, value) => onInputChange(value)}
            value={inputValue}
            onClear={() => {
              onInputChange('');
            }}
            onSearch={onNameInput}
          />
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.status}
          deleteChip={() => onDelete('status')}
          categoryName="Status"
          showToolbarItem={currentCategory === 'Status'}
        >
          <Select
            aria-label="Status"
            isOpen={isFilterDropdownOpen}
            minWidth="100px"
            onSelect={onStatusSelect}
            selected={filters.status}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onFilterToggle}
                isExpanded={isFilterDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom',
                  } as React.CSSProperties
                }
              >
                Filter by status
                {filters.status.length > 0 && <Badge isRead>{filters.status.length}</Badge>}
              </MenuToggle>
            )}
          >
            {statusMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.operatingSystem}
          deleteChip={() => onDelete('operatingSystem')}
          categoryName="Operating system"
          showToolbarItem={currentCategory === 'Operating system'}
        >
          <MenuContainer
            isOpen={isOpen}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            onOpenChangeKeys={['Escape']}
            menu={OSmenu}
            menuRef={menuRef}
            toggle={toggle}
            toggleRef={toggleRef}
          />
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.dataCollector}
          deleteChip={() => onDelete('dataCollector')}
          categoryName="Data collector"
          showToolbarItem={currentCategory === 'Data collector'}
        >
          <Select
            aria-label="Data collector"
            isOpen={isFilterDropdownOpen}
            minWidth="100px"
            onSelect={onDataCollectorSelect}
            selected={filters.dataCollector}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onFilterToggle}
                isExpanded={isFilterDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom',
                  } as React.CSSProperties
                }
              >
                Filter by data collector
                {filters.dataCollector.length > 0 && <Badge isRead>{filters.dataCollector.length}</Badge>}
              </MenuToggle>
            )}
          >
            {dataCollectorMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.rhcStatus}
          deleteChip={() => onDelete('rhcStatus')}
          categoryName="RHC status"
          showToolbarItem={currentCategory === 'RHC status'}
        >
          <Select
            aria-label="RHC status"
            isOpen={isFilterDropdownOpen}
            minWidth="100px"
            onSelect={onRHCStatusSelect}
            selected={filters.rhcStatus}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onFilterToggle}
                isExpanded={isFilterDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom',
                  } as React.CSSProperties
                }
              >
                Filter by RHC status
                {filters.rhcStatus.length > 0 && <Badge isRead>{filters.rhcStatus.length}</Badge>}
              </MenuToggle>
            )}
          >
            {rhcStatusMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.systemUpdateMethod}
          deleteChip={() => onDelete('systemUpdateMethod')}
          categoryName="System update method"
          showToolbarItem={currentCategory === 'System update method'}
        >
          <Select
            aria-label="System update method"
            isOpen={isFilterDropdownOpen}
            minWidth="100px"
            onSelect={onSystemUpdateMethodSelect}
            selected={filters.systemUpdateMethod}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onFilterToggle}
                isExpanded={isFilterDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom',
                  } as React.CSSProperties
                }
              >
                Filter by system update method
                {filters.systemUpdateMethod.length > 0 && <Badge isRead>{filters.systemUpdateMethod.length}</Badge>}
              </MenuToggle>
            )}
          >
            {systemUpdateMethodMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.lastSeen}
          deleteChip={onDelete}
          categoryName="Last seen"
          showToolbarItem={currentCategory === 'Last seen'}
        >
          <Select
            aria-label="Last seen"
            isOpen={isFilterDropdownOpen}
            minWidth="100px"
            onSelect={onLastSeenSelect}
            selected={filters.lastSeen}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onFilterToggle}
                isExpanded={isFilterDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom',
                  } as React.CSSProperties
                }
              >
                Filter by system update method
                {filters.lastSeen.length > 0 && <Badge isRead>{filters.lastSeen.length}</Badge>}
              </MenuToggle>
            )}
          >
            {lastSeenMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.tags}
          deleteChip={() => onDelete('Tags')}
          categoryName="Tags"
          showToolbarItem={currentCategory === 'Tags'}
        >
          <MenuContainer
            isOpen={isOpen}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            onOpenChangeKeys={['Escape']}
            menu={tagsMenu}
            menuRef={menuRef}
            toggle={toggle}
            toggleRef={toggleRef}
          />
        </ToolbarFilter>
      </React.Fragment>
    );
  };

  const renderToolbar = () => {
    return (
      <Toolbar id="toolbar-with-chip-groups" clearAllFilters={onDelete} collapseListedFiltersBreakpoint="xl">
        <ToolbarContent>
          <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
            <ToolbarGroup
              variant="filter-group"
              style={
                {
                  lineHeight: '22px',
                  alignItems: 'center',
                } as React.CSSProperties
              }
            >
              {buildCategoryDropdown()}
              {buildFilterDropdown()}
            </ToolbarGroup>
          </ToolbarToggleGroup>
        </ToolbarContent>
      </Toolbar>
    );
  };

  const filteredRows =
    filters.name.length > 0 || filters.status.length > 0
      ? filters.operatingSystem.length > 0 ||
        filters.dataCollector.length > 0 ||
        // filters.rhcStatus.length > 0 ||
        // filters.systemUpdateMethod.length > 0 ||
        // filters.lastSeen > 0 ||
        // filters.tags.length > 0 ||
        rows.filter((row) => {
          return (
            (filters.name.length === 0 ||
              filters.name.some((name) => row.name.toLowerCase().includes(name.toLowerCase()))) &&
            (filters.operatingSystem.length === 0 || filters.operatingSystem.includes(row.operatingSystem)) &&
            (filters.status.length === 0 || filters.status.includes(row.status)) &&
            (filters.dataCollector.length === 0 || filters.dataCollector.includes(row.status))
          );
        })
      : rows;

  let filteredTableRows = filteredRows;
  if (filteredRows.length === 0) {
    filteredTableRows = [
      {
        heightAuto: true,
        cells: [
          {
            props: { colSpan: 8 },
            title: (
              <Bullseye>
                <EmptyState>
                  <EmptyStateHeader
                    titleText="Clear all filters and try again."
                    headingLevel="h5"
                    icon={<EmptyStateIcon icon={SearchIcon} />}
                  />
                  <EmptyStateBody>
                    No results match this filter criteria. Remove all filters or clear all filters to show results.
                  </EmptyStateBody>
                  <EmptyStateFooter>
                    <EmptyStateActions>
                      <Button
                        variant="link"
                        onClick={() => {
                          this.onDelete(null);
                        }}
                      >
                        Clear all filters
                      </Button>
                    </EmptyStateActions>
                  </EmptyStateFooter>
                </EmptyState>
              </Bullseye>
            ),
          },
        ],
      },
    ];
  }

  return (
    <React.Fragment>
      <PageSection isFilled>
        {renderToolbar()}
        <Table aria-label="Filterable Table Demo">
          <Thead>
            <Tr>
              <Th key={0}>{columns[0]}</Th>
              <Th key={1}>{columns[2]}</Th>
              <Th key={2}>{columns[3]}</Th>
              <Th key={3}>{columns[7]}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* todo: slice to 10 and implement pagination */}
            {filteredRows.slice(0, 20).map((row, rowIndex) => (
              <Tr key={rowIndex}>
                <>
                  <Td dataLabel={columns[0]}>{row.name}</Td>
                  <Td dataLabel={columns[1]}>{row.operatingSystem}</Td>
                  <Td dataLabel={columns[3]}>{row.tags}</Td>
                  <Td dataLabel={columns[7]}>{row.lastSeen}</Td>
                </>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </PageSection>
    </React.Fragment>
  );
};
