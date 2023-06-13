import React from "react";
import { useQuery } from "react-query";
import { GET_POSTS } from "../services/posts";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import InputDebounce from "../components/Input/InputDebounce";
import TablePaginationActions from "../components/table/TablePaginationActions";

const apiTinyMCE = "p3ipyvync28zcgbzp3l2i88u7z2x6lksw3kqene7yq3u33dj";

const Home = () => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("judul", {
      cell: (info) => info.getValue(),
      header: () => <span>Judul</span>,
    }),
    columnHelper.accessor("thumbnail", {
      id: "thumbnail",
      cell: (info) => <img src={info.getValue()} width={30} height={30} />,
      header: () => <span>Thumbnail</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
    }),
    columnHelper.accessor("tgl_publikasi", {
      header: "Publikasi",
    }),
  ];

  const [{ search, status, orderBy, pageNumber }, setServerSide] =
    React.useState({
      search: "",
      status: "",
      orderBy: "",
      pageNumber: 1,
    });

  const fetchDataOptions = {
    search,
    status,
    orderBy,
    pageNumber,
  };

  const dataQuery = useQuery(
    ["posts", fetchDataOptions],
    () => GET_POSTS(fetchDataOptions),
    {
      keepPreviousData: true,
    }
  );

  const table = useReactTable({
    data: dataQuery.data?.data?.data?.data ?? [],
    columns,
    pageCount: dataQuery.data?.data?.data?.total ?? -1,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  const handleChangePage = (event, newPage) => {
    setServerSide({ ...fetchDataOptions, pageNumber: newPage });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={4} sx={{ my: 2 }}>
            <InputDebounce
              debounceTime={300}
              value={search}
              label="Pencarian"
              onChange={(value) => {
                setServerSide({ ...fetchDataOptions, search: value });
              }}
            />
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={dataQuery.data?.data?.data?.total}
                  rowsPerPage={10}
                  page={pageNumber}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                  rowsPerPageOptions={false}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Home;
