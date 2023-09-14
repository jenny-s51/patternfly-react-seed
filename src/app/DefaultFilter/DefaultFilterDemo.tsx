import React from 'react';
import {
  Badge,
  Bullseye,
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
  Flex,
  FlexItem,
  MenuContainer,
  MenuToggle,
  MenuToggleElement,
  PageSection,
  Pagination,
  Panel,
  PanelMain,
  PanelMainBody,
  SearchInput,
  Select,
  SelectOption,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
  TreeView,
  TreeViewDataItem,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { FilterIcon } from '@patternfly/react-icons';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { columns, rows } from '../data';
import { TagIcon } from '@patternfly/react-icons';

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
    group: string[];
  }>({
    name: [],
    status: [],
    operatingSystem: [],
    dataCollector: [],
    rhcStatus: [],
    systemUpdateMethod: [],
    lastSeen: [],
    tags: [],
    group: [],
  });
  const [currentCategory, setCurrentCategory] = React.useState('Name');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = React.useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const osToggleRef = React.useRef<HTMLButtonElement>(null);
  const osMenuRef = React.useRef<HTMLDivElement>();
  const [checkedItems, setCheckedItems] = React.useState<TreeViewDataItem[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const handleSetPage = (_evt, newPage, _perPage, startIdx, endIdx) => {
    setPaginatedRows(filteredRows.slice(startIdx, endIdx));
    setPage(newPage);
  };
  const handlePerPageSelect = (_evt, newPerPage, newPage, startIdx, endIdx) => {
    setPaginatedRows(filteredRows.slice(startIdx, endIdx));
    setPage(newPage);
    setPerPage(newPerPage);
  };

  const buildPagination = (variant, isCompact) => (
    <Pagination
      isCompact={isCompact}
      itemCount={filteredRows.length}
      page={page}
      perPage={perPage}
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      variant={variant}
      titles={{
        paginationAriaLabel: `${variant} pagination`,
      }}
    />
  );

  const onDelete = (type = '', id = '') => {
    if (type) {
      if (type === 'operatingSystem' || type === 'tags') {
        setCheckedItems([]);
      }
      const copyOfChips = filters[type];
      const filteredCopy = copyOfChips.filter((chip: string) => chip !== id);
      setFilters({
        ...filters,
        [type]: filteredCopy,
      });
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
        group: [],
      });
      setCheckedItems([]);
    }
  };

  const onDeleteGroup = (type: string) => {
    setFilters({
      ...filters,
      [type]: [],
    });
  };

  const onCategoryToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const onCategorySelect = (event) => {
    setCurrentCategory(event.target.innerText);
    setIsCategoryDropdownOpen(false);
  };

  const onFilterToggle = () => {
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

  const onSystemUpdateMethodSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      systemUpdateMethod: checked
        ? [...filters.systemUpdateMethod, selection]
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

  const onGroupSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      group: checked
        ? [...filters.group, selection]
        : Object.values(filters.group).filter((value) => value !== selection),
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
      <SelectOption key="cat3" value="Operating system">
        Operating system
      </SelectOption>,
      <SelectOption key="cat4" value="Data collector">
        Data collector
      </SelectOption>,
      <SelectOption key="cat5" value="RHC status">
        RHC status
      </SelectOption>,
      <SelectOption key="cat6" value="System update method">
        System update method
      </SelectOption>,
      <SelectOption key="cat7" value="Last seen">
        Last seen
      </SelectOption>,
      <SelectOption key="cat8" value="Group">
        Group
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
        isSelected={filters.dataCollector.includes('insights-clients')}
      >
        insights-clients
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="subscriptionManager"
        value="subscription-manager"
        isSelected={filters.dataCollector.includes('subscription-manager')}
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
      <SelectOption hasCheckbox key="methodYum" value="yum" isSelected={filters.systemUpdateMethod.includes('yum')}>
        yum
      </SelectOption>,
      <SelectOption hasCheckbox key="methodDnf" value="dnf" isSelected={filters.systemUpdateMethod.includes('dnf')}>
        dnf
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="methodRpmOstree"
        value="rpm-ostree"
        isSelected={filters.systemUpdateMethod.includes('rpm-ostree')}
      >
        rpm-ostree
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
        value="moreThan15Days"
        isSelected={filters.lastSeen.includes('More than 15 days ago')}
      >
        More than 15 days ago
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="moreThan30Days"
        value="moreThan15Days"
        isSelected={filters.lastSeen.includes('More than 30 days ago')}
      >
        More than 30 days ago
      </SelectOption>,
    ];

    const groupMenuItems = [
      <SelectOption
        hasCheckbox
        key="ungroupedSystemsGroup"
        value="Ungrouped systems"
        isSelected={filters.group.includes('Ungrouped systems')}
      >
        Ungrouped systems
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="productionGroup"
        value="Production"
        isSelected={filters.group.includes('Production')}
      >
        Production
      </SelectOption>,
      <SelectOption hasCheckbox key="stagingGroup" value="Staging" isSelected={filters.group.includes('Staging')}>
        Staging
      </SelectOption>,
      <SelectOption hasCheckbox key="previewGroup" value="Preview" isSelected={filters.group.includes('Preview')}>
        Preview
      </SelectOption>,
      <SelectOption hasCheckbox key="securityGroup" value="Security" isSelected={filters.group.includes('Security')}>
        Security
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

    const osToggle = (
      <MenuToggle ref={osToggleRef} onClick={onToggleClick} isExpanded={isOpen}>
        {'Filter by operating system'}
      </MenuToggle>
    );

    const osMapped = osOptions.map(mapTree);

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

    const onCheck = (evt: React.ChangeEvent, treeViewItem: TreeViewDataItem) => {
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

      setFilters({
        ...filters,
        operatingSystem: [...filters.operatingSystem, ...flatCheckedItems.map((i) => i.name)] as string[],
      });
    };

    const OSmenu = (
      <Panel
        ref={osMenuRef}
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
                defaultAllExpanded
                hasCheckboxes
                onCheck={(event, item) => onCheck(event, item)}
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
          deleteChip={(_category, chip) => onDelete('name', chip as string)}
          deleteChipGroup={() => onDeleteGroup('name')}
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
          deleteChip={(_category, chip) => onDelete('status', chip as string)}
          deleteChipGroup={() => onDeleteGroup('status')}
          categoryName="Status"
          showToolbarItem={currentCategory === 'Status'}
        >
          <Select
            aria-label="Status"
            isOpen={isFilterDropdownOpen}
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
          deleteChip={(_category, chip) => onDelete('operatingSystem', chip as string)}
          deleteChipGroup={() => onDeleteGroup('operatingSystem')}
          categoryName="Operating system"
          showToolbarItem={currentCategory === 'Operating system'}
        >
          <MenuContainer
            isOpen={isOpen}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            onOpenChangeKeys={['Escape']}
            menu={OSmenu}
            menuRef={osMenuRef}
            toggle={osToggle}
            toggleRef={osToggleRef}
          />
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.dataCollector}
          deleteChip={(_category, chip) => onDelete('dataCollector', chip as string)}
          deleteChipGroup={() => onDeleteGroup('dataCollector')}
          categoryName="Data collector"
          showToolbarItem={currentCategory === 'Data collector'}
        >
          <Select
            aria-label="Data collector"
            isOpen={isFilterDropdownOpen}
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
          deleteChip={(_category, chip) => onDelete('rhcStatus', chip as string)}
          deleteChipGroup={() => onDeleteGroup('rhcStatus')}
          categoryName="RHC status"
          showToolbarItem={currentCategory === 'RHC status'}
        >
          <Select
            aria-label="RHC status"
            isOpen={isFilterDropdownOpen}
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
          deleteChip={(_category, chip) => onDelete('systemUpdateMethod', chip as string)}
          deleteChipGroup={() => onDeleteGroup('systemUpdateMethod')}
          categoryName="System update method"
          showToolbarItem={currentCategory === 'System update method'}
        >
          <Select
            aria-label="System update method"
            isOpen={isFilterDropdownOpen}
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
          deleteChip={(_category, chip) => onDelete('lastSeen', chip as string)}
          deleteChipGroup={() => onDeleteGroup('lastSeen')}
          categoryName="Last seen"
          showToolbarItem={currentCategory === 'Last seen'}
        >
          <Select
            aria-label="Last seen"
            isOpen={isFilterDropdownOpen}
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
                Filter by last seen
                {filters.lastSeen.length > 0 && <Badge isRead>{filters.lastSeen.length}</Badge>}
              </MenuToggle>
            )}
          >
            {lastSeenMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.group}
          deleteChip={(_category, chip) => onDelete('group', chip as string)}
          deleteChipGroup={() => onDeleteGroup('group')}
          categoryName="Group"
          showToolbarItem={currentCategory === 'Group'}
        >
          <Select
            aria-label="Group"
            isOpen={isFilterDropdownOpen}
            onSelect={onGroupSelect}
            selected={filters.group}
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
                Filter by group
                {filters.group.length > 0 && <Badge isRead>{filters.group.length}</Badge>}
              </MenuToggle>
            )}
          >
            {groupMenuItems}
          </Select>
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
          <ToolbarItem variant="pagination">{buildPagination('top', true)}</ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    );
  };

  const filteredRows =
    (filters.name.length ||
      filters.status.length ||
      filters.dataCollector.length ||
      filters.rhcStatus.length ||
      filters.operatingSystem.length ||
      filters.group.length ||
      filters.systemUpdateMethod.length) > 0
      ? rows.filter((row) => {
          return (
            (filters.name.length === 0 ||
              filters.name.some((name) => row.name.toLowerCase().includes(name.toLowerCase()))) &&
            (filters.status.length === 0 || filters.status.includes(row.status)) &&
            (filters.dataCollector.length === 0 || filters.dataCollector.includes(row.dataCollector)) &&
            (filters.rhcStatus.length === 0 || filters.rhcStatus.includes(row.rhcStatus)) &&
            (filters.systemUpdateMethod.length === 0 || filters.systemUpdateMethod.includes(row.systemUpdateMethod)) &&
            (filters.operatingSystem.length === 0 || filters.operatingSystem.includes(row.operatingSystem)) &&
            (filters.group.length === 0 ||
              filters.group.includes(row.group) ||
              filters.group.some((group) => group === 'Ungrouped systems' && row.group === 'N/A'))
          );
        })
      : rows;

  const [paginatedRows, setPaginatedRows] = React.useState(
    filteredRows.slice((page - 1) * perPage, page * perPage - 1),
  );

  React.useEffect(() => {
    setPaginatedRows(filteredRows.slice((page - 1) * perPage, page * perPage - 1));
  }, [filteredRows, page, perPage]);

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
            {filteredRows.length === 0 ? (
              <Tr>
                <Td colSpan={8}>
                  <Bullseye>
                    <EmptyState variant={'sm'}>
                      <EmptyStateHeader
                        icon={<EmptyStateIcon icon={SearchIcon} />}
                        titleText="No results found"
                        headingLevel="h2"
                      />
                      <EmptyStateBody>
                        No results match this filter criteria. Clear all filters and try again.
                      </EmptyStateBody>
                      <EmptyStateFooter>
                        <EmptyStateActions>
                          <Button
                            variant="link"
                            onClick={() => {
                              onDelete();
                            }}
                          >
                            Clear all filters
                          </Button>
                        </EmptyStateActions>
                      </EmptyStateFooter>
                    </EmptyState>
                  </Bullseye>
                </Td>
              </Tr>
            ) : (
              paginatedRows.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  <>
                    <Td dataLabel={columns[0]}>{row.name}</Td>
                    <Td dataLabel={columns[1]}>{row.operatingSystem}</Td>
                    <Td dataLabel={columns[3]}>
                      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                        <FlexItem>
                          <TagIcon color="var(--pf-v5-global--Color--200)" key="icon" />
                        </FlexItem>
                        <FlexItem>{2}</FlexItem>
                      </Flex>
                    </Td>{' '}
                    <Td dataLabel={columns[7]}>{row.lastSeen}</Td>
                  </>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </PageSection>
    </React.Fragment>
  );
};
