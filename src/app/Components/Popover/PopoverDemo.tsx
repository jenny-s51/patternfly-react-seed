import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement,
  PageSection,
} from '@patternfly/react-core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Content } from "@patternfly/react-core";

export const PopoverDemo: React.FunctionComponent = () => {
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
      <Content>
        <Content component="h1">Dropdown demo </Content>
        <Content component="p">
          Dropdown theming demo. This is a small demo to test theming the PF6 Alert component. Stylesheet contains
          themed tokens for PF6 component and has been loaded into this demo.
        </Content>
      </Content>
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
          disableRipple
        >
          Dashboard
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
          <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
            Dropdown
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
            My Account
          </DropdownItem>
          <DropdownItem value={2} key="other action">
            Log Out
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </PageSection>
  );
};
