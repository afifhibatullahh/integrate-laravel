import React from "react";
import TablePaginationActions from "./TablePaginationActions";
import { TableFooter, TablePagination, TableRow } from "@mui/material";

const CTableFooter = ({ ...params }) => {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={3}
          rowsPerPage={10}
          ActionsComponent={TablePaginationActions}
          rowsPerPageOptions={false}
          labelDisplayedRows={() => <></>}
          {...params}
        />
      </TableRow>
    </TableFooter>
  );
};

export default CTableFooter;
