import * as React from 'react';
import { Content, PageSection } from '@patternfly/react-core';

const Dashboard: React.FunctionComponent = () => (
  <PageSection>
  <Content component="h1">MUI / PF6 POC</Content>
  <Content component="p">


  This is a Material UI theme POC, prioritizing components from the model registry UI, built on top of PatternFly 6 design tokens.

  <br />
  <br />
   Navigate to Components to view themed PF components, and toggle the switch above to apply MUI theming.

  </Content>
</PageSection>
)

export { Dashboard };
