import {
  FormControl,
  MenuItem,
  Select,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import React from "react";

const CTableHead = ({ table, status, onChange }) => {
  return (
    <TableHead>
      <TableRow>
        {table.getHeaderGroups()[0].headers.map((header) => {
          return (
            <TableCell key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : (
                <div>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.id == "status" ? (
                    <FormControl size="small">
                      <Select value={status} onChange={onChange}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Publish"}>Publish</MenuItem>
                        <MenuItem value={"Draft"}>Draft</MenuItem>
                      </Select>
                    </FormControl>
                  ) : null}
                </div>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default CTableHead;
