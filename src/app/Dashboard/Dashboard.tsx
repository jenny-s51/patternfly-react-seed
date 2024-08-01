import * as React from 'react';
import { PageSection, Text, TextContent } from '@patternfly/react-core';

const Dashboard: React.FunctionComponent = () => (
  <PageSection>
  <TextContent>
  <Text component="h1">MUI / PF6 POC</Text>
  <Text component="p">


  This is a Material UI theme POC, prioritizing components from the model registry UI, built on top of PatternFly 6 design tokens.

  <br />
  <br />
   Navigate to Components to view themed PF components, and toggle the switch above to apply MUI theming.

  </Text>
</TextContent>
</PageSection>
)

export { Dashboard };
