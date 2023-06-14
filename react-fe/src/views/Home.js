import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DELETE_POST, GET_POSTS } from "../services/posts";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import InputDebounce from "../components/Input/InputDebounce";
import { useDispatch } from "react-redux";
import { openAlertMessage } from "../store/slice/snackbarSlice";
import useDialogConfirm from "../components/feedback/CDialog";
import CTableHead from "../components/table/CTableHead";
import CTableBody from "../components/table/CTableBody";
import CTableFooter from "../components/table/CTableFooter";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slice/authSlice";

const Home = () => {
  const columnHelper = createColumnHelper();

  const dispatch = useDispatch();
  const { DialogConfirmComponent, dialogConfirmOpen } = useDialogConfirm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const columns = [
    columnHelper.accessor("judul", {
      cell: (info) => info.getValue(),
      header: () => <span>Judul</span>,
    }),
    columnHelper.accessor("thumbnail", {
      id: "thumbnail",
      cell: (info) => (
        <img
          src={`http://127.0.0.1:8000/thumbnails/${info.getValue()}`}
          width={30}
          height={30}
        />
      ),
      header: () => <span>Thumbnail</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
    }),
    columnHelper.accessor("tgl_publikasi", {
      header: "Publikasi",
    }),
    columnHelper.accessor("action", {
      header: "Aksi",
      cell: (info) => (
        <>
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`posts/edit/${info.row.original.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() =>
              dialogConfirmOpen("Yakin hapus data ini", info.row.original.id)
            }
          >
            Delete
          </Button>
        </>
      ),
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

  const deleteMutation = useMutation((data) => DELETE_POST(data), {
    onSuccess: (data) => {
      dispatch(
        openAlertMessage({
          message: data?.data?.message,
          severity: "success",
        })
      );
      queryClient.invalidateQueries(["posts", fetchDataOptions]);
    },
    onError: (error) => {
      dispatch(
        openAlertMessage({
          message: error?.response?.data?.message,
          severity: "error",
        })
      );
    },
  });

  const handleDelete = (data) => {
    deleteMutation.mutateAsync(data);
  };

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
        <Grid container sx={{ my: 2 }} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <InputDebounce
              debounceTime={300}
              value={search}
              label="Pencarian"
              onChange={(value) => {
                setServerSide({ ...fetchDataOptions, search: value });
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => navigate("posts/add")}>
              Tambah
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <CTableHead
              table={table}
              status={status}
              onChange={(e) =>
                setServerSide({
                  ...fetchDataOptions,
                  status: e.target.value,
                })
              }
            />
            <CTableBody table={table} />
            <CTableFooter
              count={dataQuery.data?.data?.data?.total}
              page={pageNumber}
              lastPage={dataQuery.data?.data?.data?.last_page}
              onPageChange={handleChangePage}
            />
          </Table>
        </TableContainer>
        <DialogConfirmComponent
          value="Hapus"
          handleConfirm={(data) => handleDelete(data)}
        />
      </Box>
      <Box display={"flex"} justifyContent="space-between">
        <Button
          variant="outlined"
          color="info"
          sx={{ mt: 5 }}
          onClick={() => {
            navigate("/list-user-github");
          }}
        >
          Github users
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 5 }}
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
