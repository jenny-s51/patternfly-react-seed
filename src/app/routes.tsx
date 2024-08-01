import * as React from 'react';
import { Route, RouteComponentProps, Switch, useLocation } from 'react-router-dom';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { Support } from './Support/Support';
import { DropdownDemo } from './Components/Dropdown/DropdownDemo';
import { PaginationDemo } from "./Components/Pagination/PaginationDemo";
import { AlertDemo } from "./Components/Alert/AlertDemo";
import { BadgeDemo } from "./Components/Badge/BadgeDemo";
import { DescriptionListDemo } from "./Components/DescriptionList/DescriptionListDemo";
import { FormDemo } from "./Components/Form/FormDemo";
import { LabelDemo } from "./Components/Label/LabelDemo";
import { ModalDemo } from "./Components/Modal/ModalDemo";
import { PopoverDemo } from "./Components/Popover/PopoverDemo";
import { TooltipDemo } from "./Components/Tooltip/TooltipDemo";
import { ButtonDemo } from "./Components/Button/ButtonDemo";
import { TabsDemo } from "./Components/Tabs/TabsDemo";
import { TableDemo } from "./Components/Table/TableDemo";

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: Support,
    exact: true,
    label: 'Support',
    path: '/support',
    title: 'PatternFly Seed | Support Page',
  },
  {
    label: 'Components',
    routes: [
      {
        component: AlertDemo,
        exact: true,
        label: 'Alert Demo',
        path: '/components/alert',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: BadgeDemo,
        exact: true,
        label: 'Badge Demo',
        path: '/components/badge',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: ButtonDemo,
        exact: true,
        label: 'Button Demo',
        path: '/components/button',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: DescriptionListDemo,
        exact: true,
        label: 'Description List Demo',
        path: '/components/description-list',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: DropdownDemo,
        exact: true,
        label: 'Dropdown Demo',
        path: '/components/dropdown',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: FormDemo,
        exact: true,
        label: 'Form Demo',
        path: '/components/form',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: LabelDemo,
        exact: true,
        label: 'Label Demo',
        path: '/components/label',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: ModalDemo,
        exact: true,
        label: 'Modal Demo',
        path: '/components/modal',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: PaginationDemo,
        exact: true,
        label: 'Pagination Demo',
        path: '/components/pagination',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: PopoverDemo,
        exact: true,
        label: 'Popover Demo',
        path: '/components/pagination',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: TabsDemo,
        exact: true,
        label: 'Tabs Demo',
        path: '/components/tabs',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: TableDemo,
        exact: true,
        label: 'Table Demo',
        path: '/components/table',
        title: 'PatternFly Seed | Profile Settings',
      },
      {
        component: TooltipDemo,
        exact: true,
        label: 'Tooltip Demo',
        path: '/components/tooltip',
        title: 'PatternFly Seed | Profile Settings',
      },
    ],
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
// may not be necessary if https://github.com/ReactTraining/react-router/issues/5210 is resolved
const useA11yRouteChange = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    routeFocusTimer = window.setTimeout(() => {
      const mainContainer = document.getElementById('primary-app-container');
      if (mainContainer) {
        mainContainer.focus();
      }
    }, 50);
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [pathname]);
};

const RouteWithTitleUpdates = ({ component: Component, title, ...rest }: IAppRoute) => {
  useA11yRouteChange();
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[],
);

const AppRoutes = (): React.ReactElement => (
  <Switch>
    {flattenedRoutes.map(({ path, exact, component, title }, idx) => (
      <RouteWithTitleUpdates path={path} exact={exact} component={component} key={idx} title={title} />
    ))}
    <PageNotFound title="404 Page Not Found" />
  </Switch>
);

export { AppRoutes, routes };
