import React from 'react';
import {
  Label,

  PageSection,
  Text,
  TextContent,
} from '@patternfly/react-core';
import Chip from '@mui/material/Chip';

export const LabelDemo: React.FunctionComponent = () => {

  return (
    <PageSection>
      <TextContent>
        <Text component="h1">Label demo </Text>
        <Text component="p">
          Label theming demo. This is a small demo to test theming the PF6 Label component. Stylesheet contains themed
          tokens for PF6 component and has been loaded into this demo.
        </Text>
      </TextContent>
      <br />
      MUI Label:
      <div>
        <Chip label="abc" color="primary" size="small" />
      </div>
      <br />
      PF Label:
      <br />
      <Label color="blue">abc</Label>
    </PageSection>
  );
};
