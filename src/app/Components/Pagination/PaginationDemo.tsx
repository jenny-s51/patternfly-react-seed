import React from 'react';
import {
  Content,
  PageSection,
  Pagination,
} from '@patternfly/react-core';
import TablePagination from '@mui/material/TablePagination';

export const PaginationDemo: React.FunctionComponent = () => {

  const [muiPage, setMuiPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setMuiPage(newPage);
  };

  const [pfPage, setPfPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPfPage(newPage);
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number
  ) => {
    setPerPage(newPerPage);
    setPfPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setMuiPage(0);
  };


  return (
    <PageSection>
        <Content component="h1">Pagination demo </Content>
        <Content component="p">
          Pagination theming demo. This is a small demo to test theming the PF6 Pagination component. Stylesheet contains
          themed tokens for PF6 component and has been loaded into this demo.
        </Content>
      <br />
      MUI Pagination:

      <TablePagination
      component="div"
      count={100}
      page={muiPage}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      <br />
      PF Pagination:
      <br />
      <Pagination
      itemCount={523}
      perPage={perPage}
      page={pfPage}
      onSetPage={onSetPage}
      widgetId="compact-example"
      onPerPageSelect={onPerPageSelect}
      isCompact
    />
    </PageSection>
  );
};
