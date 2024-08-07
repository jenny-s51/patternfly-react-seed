import React from 'react';
import {
  Content,
  Icon,
  MenuToggle,
  MenuToggleElement,
  Toolbar as PFToolbar,
  PageSection,
  SearchInput,
  Select as PFSelect,
  SelectList,
  SelectOption,
  Toolbar as PFToolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import { Select, SelectChangeEvent } from "@mui/material";


export const SearchFilterDemo: React.FunctionComponent = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [statusIsExpanded, setStatusIsExpanded] = React.useState(false);
  const [statusSelected, setStatusSelected] = React.useState('');


  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const statusOptions = ['New', 'Pending', 'Running', 'Cancelled'];

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


  const toggleGroupItems = (
    <React.Fragment>
      <ToolbarGroup variant="filter-group">
        <ToolbarItem>
          <PFSelect
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef!}
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
          </PFSelect>
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

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

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
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}>
          <FormControl sx={{ width: 140 }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={() => handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </Paper>
      <br />
      <br />
      PF Search Filter:
      <br />
      <PFToolbar
        id="toolbar-consumer-managed-toggle-groups"
        isExpanded={isExpanded}
        className="pf-m-toggle-group-container"
        toggleIsExpanded={toggleIsExpanded}
      >
        <ToolbarContent>{items}</ToolbarContent>
      </PFToolbar>
    </PageSection>
  );
};
