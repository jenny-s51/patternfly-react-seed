import * as React from 'react';
import { Content, Button as PFButton, PageSection } from '@patternfly/react-core';
import '../../MUI-theme.css';

import Button from '@mui/material/Button';

const ButtonDemo: React.FunctionComponent = () => {
  return (
    <>
      <PageSection>
        <Content component="h1">Button demo </Content>
        <Content component="p">
          Button theming demo. This is a small demo to test theming the PF6 Button component. Stylesheet contains themed
          tokens for PF6 components and has been loaded into this demo.
        </Content>
        <br />
        MUI Button:
        <br />
        <Button variant="contained" disableElevation>
          Button
        </Button>
        <br />
        <br />
        PF button:
        <br />
        <PFButton onClick={() => console.log('success')}>Button</PFButton>
      </PageSection>
    </>
  );
};

export { ButtonDemo };
