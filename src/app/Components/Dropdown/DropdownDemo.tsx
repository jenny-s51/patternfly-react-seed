import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement,
  PageSection,
  Title,
  Text,
  Alert,
  TextContent,
  Divider,
} from '@patternfly/react-core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const DropdownDemo: React.FunctionComponent = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isOpen, setIsOpen] = React.useState(false);


  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    // eslint-disable-next-line no-console
    console.log('selected', value);
    setIsOpen(false);
  };

  return (
    <PageSection>
      <TextContent>
        <Text component="h1">Dropdown demo </Text>
        <Text component="p">
          Dropdown theming demo. This is a small demo to test theming the PF6 Dropdown component. Stylesheet contains
          themed tokens for PF6 component and has been loaded into this demo.
        </Text>
      </TextContent>
      <br />
      MUI Dropdown:

      <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="contained"
        disableRipple
        disableElevation
      >
        Actions
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
      <br />
      PF Dropdown:
      <br />
      <Dropdown
        isOpen={isOpen}
        onSelect={onSelect}
        onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
          <MenuToggle variant="primary" ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
            Actions
          </MenuToggle>
        )}
        ouiaId="BasicDropdown"
        shouldFocusToggleOnSelect
      >
        <DropdownList>
          <DropdownItem value={0} key="action">
            Profile
          </DropdownItem>
          <DropdownItem
            value={1}
            key="link"
            to="#default-link2"
            // Prevent the default onClick functionality for example purposes
            onClick={(ev: any) => ev.preventDefault()}
          >
            My account
          </DropdownItem>
          <DropdownItem value={2} key="other action">
            Logout
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </PageSection>
  );
};
