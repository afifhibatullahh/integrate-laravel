import { TableBody, TableCell, TableRow } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import React from "react";

const CTableBody = ({ table }) => {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CTableBody;
