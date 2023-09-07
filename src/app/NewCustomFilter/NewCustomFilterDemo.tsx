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
  Pagination,
  ButtonVariant,
  Dropdown,
  DropdownList,
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuControl,
  OverflowMenuGroup,
  OverflowMenuItem,
  Divider,
  SelectGroup,
  SelectList,
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { Table, TableText, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { columns, rows } from '../data';
import { EllipsisVIcon } from '@patternfly/react-icons';

export const NewCustomFilterDemo: React.FunctionComponent = () => {
  const [filters, setFilters] = React.useState<{
    name: string[];
    status: string[];
    operatingSystem: TreeView[];
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
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = React.useState(false);
  const [isOSDropdownOpen, setIsOSDropdownOpen] = React.useState(false);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = React.useState(false);
  const [isRHCStatusDropdownOpen, setIsRHCStatusDropdownOpen] = React.useState(false);
  const [isLastSeenDropdownOpen, setIsLastSeenDropdownOpen] = React.useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = React.useState(false);
  const [nameInput, setNameInput] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [tableRows, setTableRows] = React.useState(rows.slice(0, 10));
  const [paginatedRows, setPaginatedRows] = React.useState(rows.slice(0, 10));
  const osToggleRef = React.useRef<HTMLButtonElement>(null);
  const tagsToggleRef = React.useRef<HTMLButtonElement>(null);

  const osMenuRef = React.useRef<HTMLDivElement>();
  const tagsMenuRef = React.useRef<HTMLDivElement>();

  const [checkedItems, setCheckedItems] = React.useState<TreeViewDataItem[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // console.log('filters', filters);

  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const handleSetPage = (_evt, newPage, _perPage, startIdx, endIdx) => {
    setPaginatedRows(rows.slice(startIdx, endIdx));
    setPage(newPage);
  };
  const handlePerPageSelect = (_evt, newPerPage, newPage, startIdx, endIdx) => {
    setPaginatedRows(rows.slice(startIdx, endIdx));
    setPage(newPage);
    setPerPage(newPerPage);
  };

  const buildPagination = (variant, isCompact) => (
    <Pagination
      isCompact={isCompact}
      itemCount={rows.length}
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
    console.log('ID', id);
    console.log('type', type);
    if (type) {
      const copyOfChips = filters[type];
      console.log('yum chips', copyOfChips);
      const filteredCopy = copyOfChips.filter((chip) => chip !== id);
      console.log('COPY', filteredCopy);
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
    }
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
    // TODO: remove these ? setIsStatusDropdownOpen(false);
  };

  const onOSSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      operatingSystem: checked
        ? [...filters.operatingSystem, selection]
        : Object.values(filters.operatingSystem).filter((value) => value !== selection),
    });
    // setIsOSDropdownOpen(false);
  };

  const onSystemUpdateMethodSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      systemUpdateMethod: checked
        ? [...filters.systemUpdateMethod, selection]
        : Object.values(filters.systemUpdateMethod).filter((value) => value !== selection),
    });
    // setIsFilterDropdownOpen(false);
  };

  const onRHCStatusSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      rhcStatus: checked ? [selection] : Object.values(filters.rhcStatus).filter((value) => value !== selection),
    });
    // setIsRHCStatusDropdownOpen(false);
  };

  const onLastSeenSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
      ...filters,
      lastSeen: checked
        ? [...filters.lastSeen, selection]
        : Object.values(filters.lastSeen).filter((value) => value !== selection),
    });
    // setIsLastSeenDropdownOpen(false);
  };

  const onDataCollectorSelect = (event, selection) => {
    const checked = event.target.checked;
    // console.log(selection);
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
      status: checked
        ? [...filters.group, selection]
        : Object.values(filters.group).filter((value) => value !== selection),
    });
    // setIsFilterDropdownOpen(false);
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

    const filterMenuItems = [
      <>
        <SelectGroup label="Data Collector">
          <SelectList>
            {dataCollectorMenuItems}
          </SelectList>
        </SelectGroup>
        <Divider />
        <SelectGroup label="System Update Method">
          <SelectList>
            {systemUpdateMethodMenuItems}
          </SelectList>
        </SelectGroup>
        <Divider />
        <SelectGroup label="Group">
          <SelectList>
            {groupMenuItems}
          </SelectList>
        </SelectGroup>
      </>
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

    const onOSToggleClick = () => {
      setIsOSDropdownOpen(!isOSDropdownOpen);
    };

    const onTagsToggleClick = () => {
      setIsTagsDropdownOpen(!setIsTagsDropdownOpen);
    };

    const OSToggle = (
      <MenuToggle ref={osToggleRef} onClick={onOSToggleClick} isExpanded={isOSDropdownOpen}>
        {'Operating system'}
        {filters.operatingSystem.length > 0 && <Badge isRead>{filters.operatingSystem.length}</Badge>}
      </MenuToggle>
    );

    const tagsToggle = (
      <MenuToggle ref={tagsToggleRef} onClick={onTagsToggleClick} isExpanded={isTagsDropdownOpen}>
        {'Tags'}
        {filters.tags.length > 0 && <Badge isRead>{filters.tags.length}</Badge>}
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
            id: 'production',
            checkProps: { checked: false },
          },
          {
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
      console.log(treeViewItem);

      options = osOptions;

      console.log(Object.values(filters.operatingSystem).filter((value) => value !== treeViewItem.name));

      setFilters({
        ...filters,
        operatingSystem: checked
          ? [...filters.operatingSystem, treeViewItem.name]
          : Object.values(filters.operatingSystem).filter((value) => value !== treeViewItem.name),
      });
      // setIsFilterDropdownOpen(false);

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

    const osMenu = (
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
        ref={tagsMenuRef}
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
          // chips={filters.status}
          deleteChip={(_category, chip) => onDelete('status', chip as string)}
          categoryName="Status"
        >
          <Select
            aria-label="Status"
            isOpen={isStatusDropdownOpen}
            onOpenChange={(isStatusDropdownOpen) => setIsStatusDropdownOpen(isStatusDropdownOpen)}
            onSelect={onStatusSelect}
            selected={filters.status}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                isExpanded={isStatusDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom',
                  } as React.CSSProperties
                }
              >
                Status
                {filters.status.length > 0 && <Badge isRead>{filters.status.length}</Badge>}
              </MenuToggle>
            )}
          >
            {statusMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          // chips={filters.operatingSystem}
          deleteChip={(_category, chip) => onDelete('operatingSystem', chip as string)}
          categoryName="Operating system"
        >
          <MenuContainer
            isOpen={isOSDropdownOpen}
            onOpenChange={(isOSDropdownOpen) => setIsOSDropdownOpen(isOSDropdownOpen)}
            onOpenChangeKeys={['Escape']}
            menu={osMenu}
            menuRef={osMenuRef}
            toggle={OSToggle}
            toggleRef={osToggleRef}
          />
        </ToolbarFilter>
        <ToolbarFilter
          // chips={filters.tags}
          deleteChip={(_category, chip) => onDelete('tags', chip as string)}
          categoryName="Tags"
        >
          <MenuContainer
            isOpen={isTagsDropdownOpen}
            onOpenChange={(isTagsDropdownOpen) => setIsTagsDropdownOpen(isTagsDropdownOpen)}
            onOpenChangeKeys={['Escape']}
            menu={tagsMenu}
            menuRef={tagsMenuRef}
            toggle={tagsToggle}
            toggleRef={tagsToggleRef}
          />
        </ToolbarFilter>
        <ToolbarFilter
          // chips={filters.rhcStatus}
          deleteChip={(_category, chip) => onDelete('rhcStatus', chip as string)}
          categoryName="RHC status"
        >
          <Select
            aria-label="RHC status"
            isOpen={isRHCStatusDropdownOpen}
            onOpenChange={(isRHCStatusDropdownOpen) => setIsRHCStatusDropdownOpen(isRHCStatusDropdownOpen)}
            onSelect={onRHCStatusSelect}
            selected={filters.rhcStatus}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => setIsRHCStatusDropdownOpen(!isRHCStatusDropdownOpen)}
                isExpanded={isRHCStatusDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom',
                  } as React.CSSProperties
                }
              >
                RHC status
                {filters.rhcStatus.length > 0 && <Badge isRead>{filters.rhcStatus.length}</Badge>}
              </MenuToggle>
            )}
          >
            {rhcStatusMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          // chips={filters.lastSeen}
          deleteChip={(_category, chip) => onDelete('Last seen', chip as string)}
          categoryName="Last seen"
        >
          <Select
            aria-label="Last seen"
            isOpen={isLastSeenDropdownOpen}
            onSelect={onLastSeenSelect}
            selected={filters.lastSeen}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                isDisabled
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
                Last seen
                {filters.lastSeen.length > 0 && <Badge isRead>{filters.lastSeen.length}</Badge>}
              </MenuToggle>
            )}
          >
            {lastSeenMenuItems}
          </Select>
        </ToolbarFilter>

        <ToolbarFilter
          // chips={filters.group}
          deleteChip={(_category, chip) => onDelete('group', chip as string)}
          categoryName="Group"
        >
          <Select
            aria-label="Group"
            isOpen={isFilterDropdownOpen}
            onOpenChange={(isFilterDropdownOpen) => setIsFilterDropdownOpen(isFilterDropdownOpen)}
            onSelect={onGroupSelect}
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
                <FilterIcon />
                {filters.group.length > 0 && <Badge isRead>{filters.group.length}</Badge>}
              </MenuToggle>
            )}
          >
            {filterMenuItems}
          </Select>
        </ToolbarFilter>
      </React.Fragment>
    );
  };

  const firstRow = (
    <Toolbar clearAllFilters={onDelete}>
      <ToolbarContent>
        <ToolbarFilter
          // chips={filters.name}
          deleteChip={(_category, chip) => onDelete('name', chip as string)}
          categoryName="Name"
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
      </ToolbarContent>
    </Toolbar>
  );

  const renderToolbar = () => {
    return (
      <React.Fragment>
        {firstRow}
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
                {buildFilterDropdown()}
              </ToolbarGroup>
            </ToolbarToggleGroup>
            <ToolbarItem variant="pagination">{buildPagination('top', true)}</ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </React.Fragment>
    );
  };

  const filteredRows =
    (filters.name.length ||
      filters.status.length ||
      filters.dataCollector.length ||
      filters.rhcStatus.length ||
      filters.tags.length ||
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
            (filters.tags.length === 0 || filters.tags.includes(row.tags)) &&
            (filters.systemUpdateMethod.length === 0 || filters.systemUpdateMethod.includes(row.systemUpdateMethod)) &&
            (filters.operatingSystem.length === 0 || filters.operatingSystem.includes(row.operatingSystem)) &&
            (filters.group.length === 0 || filters.group.includes(row.group))
          );
        })
      : rows;

  // console.log('WEEEE', filteredRows);

  console.log('FILERS.OPERATINGSYSTEM', filters.operatingSystem);

  let filteredTableRows = filteredRows;
  if (filteredRows.length === 0) {
    const emptyStateTable = [
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
                          onDelete(null);
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

  // console.log('FILTERED ROWS', filteredRows);

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
