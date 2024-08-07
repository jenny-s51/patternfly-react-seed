import * as React from 'react';
import {
  Content,
  Alert as PFAlert,
  PageSection,
} from '@patternfly/react-core';
import '../../MUI-theme.css';

import Alert from '@mui/material/Alert';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const AlertDemo: React.FunctionComponent = () => {

  const [isSwitched, setIsSwitched] = React.useState<boolean>(false);

  React.useEffect(() => {
    const updateSwitchState = () => {
      const switchValue = (window as any).isSwitched;
      setIsSwitched(switchValue);
    };

    updateSwitchState();

    console.log('test', isSwitched);

    return () => {

    };
  }, []);



  return (
    <>
      <PageSection>
        <Content>
          <Content component="h1">Alert demo </Content>
          <Content component="p">
            Alert theming demo. This is a small demo to test theming the PF6 Alert component. Stylesheet contains themed
            tokens for PF6 component and has been loaded into this demo.
          </Content>
        </Content>
        <br />
        MUI Alert:
        <Alert variant="outlined" severity="warning">
          This is an outlined warning Alert.
        </Alert>
        <br />
        PF Alert:
        <PFAlert
        // hide this when the theme is toggled
          customIcon={isSwitched ? <WarningAmberIcon /> : undefined}
          variant="warning"
          title="This is an outlined warning Alert."
          ouiaId="WarningAlert"
        />
      </PageSection>
    </>
  );
};

export { AlertDemo };
