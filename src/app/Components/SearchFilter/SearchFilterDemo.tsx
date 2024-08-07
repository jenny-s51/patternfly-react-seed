import React from 'react';
import {
  Content,
  Icon,
  MenuToggle,
  MenuToggleElement,
  PageSection,
  SearchInput,
  Select,
  SelectList,
  SelectOption,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

export const SearchFilterDemo: React.FunctionComponent = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [statusIsExpanded, setStatusIsExpanded] = React.useState(false);
  const [statusSelected, setStatusSelected] = React.useState('');
  const [riskIsExpanded, setRiskIsExpanded] = React.useState(false);
  const [riskSelected, setRiskSelected] = React.useState('');

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const statusOptions = ['New', 'Pending', 'Running', 'Cancelled'];
  const riskOptions = ['Risk', 'Low', 'Medium', 'High'];

  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const onStatusToggle = () => {
    setStatusIsExpanded(!statusIsExpanded);
  };

  const onStatusSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, selection: string) => {
    setStatusSelected(selection);
    setStatusIsExpanded(false);
  };

  const onRiskToggle = () => {
    setRiskIsExpanded(!riskIsExpanded);
  };

  const onRiskSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, selection: string) => {
    setRiskSelected(selection);
    setRiskIsExpanded(false);
  };

  const toggleGroupItems = (
    <React.Fragment>
      <ToolbarGroup variant="filter-group">
        <ToolbarItem>
          <Select
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => onStatusToggle()}
                isExpanded={statusIsExpanded}
                icon={
                  <Icon>
                    <FilterIcon />
                  </Icon>
                }
                style={
                  {
                    width: '150px',
                  } as React.CSSProperties
                }
              >
                {statusSelected || 'Status'}
              </MenuToggle>
            )}
            onSelect={() => onStatusSelect}
            onOpenChange={(isOpen) => setStatusIsExpanded(isOpen)}
            selected={statusSelected}
            isOpen={statusIsExpanded}
          >
            <SelectList>
              {statusOptions.map((option, index) => (
                <SelectOption key={index} value={option}>
                  {option}
                </SelectOption>
              ))}
            </SelectList>
          </Select>
        </ToolbarItem>
        <ToolbarItem>
          <SearchInput
            aria-label="Consumer toggle groups example search input"
            onChange={(_event, value) => onInputChange(value)}
            value={inputValue}
            onClear={() => {
              onInputChange('');
            }}
          />
        </ToolbarItem>
      </ToolbarGroup>
    </React.Fragment>
  );

  const items = (
    <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
      {toggleGroupItems}
    </ToolbarToggleGroup>
  );
  const toolbarItems = (
    <React.Fragment>
      <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
        {toggleGroupItems}
      </ToolbarToggleGroup>
    </React.Fragment>
  );

  return (
    <PageSection>
      <Content component="h1">Search Filter demo </Content>
      <Content component="p">
        Search Filter theming demo. This is a small demo to test theming the PF6 Search Filter components. Stylesheet
        contains themed tokens for PF6 components and has been loaded into this demo.
      </Content>
      <br />
      MUI Search Filter:
      <br />
      <br />
      <br />
      PF Search Filter:
      <br />
      <Toolbar
        id="toolbar-consumer-managed-toggle-groups"
        isExpanded={isExpanded}
        className="pf-m-toggle-group-container"
        toggleIsExpanded={toggleIsExpanded}
      >
        <ToolbarContent>{items}</ToolbarContent>
      </Toolbar>
    </PageSection>
  );
};
