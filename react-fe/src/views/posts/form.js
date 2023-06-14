import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_POST, GET_POST, UPDATE_POST } from "../../services/posts";
import { openAlertMessage } from "../../store/slice/snackbarSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";

const apiTinyMCE = "p3ipyvync28zcgbzp3l2i88u7z2x6lksw3kqene7yq3u33dj";

const FormPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataForm, setDataForm] = React.useState({
    judul: "",
    konten: "",
    tgl_publikasi: "",
    status: "",
    thumbnail: null,
  });

  const { judul, konten, tgl_publikasi, status, thumbnail } = dataForm;

  const editorRef = useRef(null);

  useQuery(["post", id], () => GET_POST(id), {
    onSuccess: (data) => {
      const res = data.data.data;
      setDataForm(res);
    },
    enabled: Boolean(id),
  });

  const handleSubmit = async () => {
    let formData = new FormData();
    for (let key in dataForm) {
      formData.append(key, dataForm[key]);
    }
    const res = await ADD_POST(formData);

    if (res.status === 201) {
      dispatch(
        openAlertMessage({
          message: res?.data?.message,
          severity: "success",
        })
      );
      navigate("/");
    } else {
      dispatch(
        openAlertMessage({
          message: "Masukan semua data",
          severity: "error",
        })
      );
    }
  };

  const handleEdit = async () => {
    let formData = new FormData();
    for (let key in dataForm) {
      formData.append(key, dataForm[key]);
    }
    const res = await UPDATE_POST({ id: id, body: dataForm });
    console.log(res);
    if (res.status >= 200 && res.status < 300) {
      dispatch(
        openAlertMessage({
          message: res?.data?.message,
          severity: "success",
        })
      );
      navigate("/");
    } else {
      dispatch(
        openAlertMessage({
          message: "Terjadi Kesalahan",
          severity: "error",
        })
      );
    }
  };

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    setDataForm({ ...dataForm, thumbnail: e.target.files[0] });
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        marginTop: 4,
      }}
    >
      <Button onClick={() => navigate(-1)}>Kembali</Button>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {id ? "Edit" : "Tambah"}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="judul"
                value={judul}
                required
                fullWidth
                id="judul"
                label="Judul"
                autoFocus
                onChange={(e) =>
                  setDataForm({ ...dataForm, judul: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" component="label" size="small">
                <Typography fontSize={11}>
                  {thumbnail?.name ? thumbnail.name : "Upload thumbnail"}
                </Typography>
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Editor
                apiKey={apiTinyMCE}
                onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    konten: editorRef.current.getContent(),
                  })
                }
                initialValue={konten}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="statusSelect">Status</InputLabel>
                <Select
                  labelId="statusSelect"
                  value={status}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, status: e.target.value })
                  }
                >
                  <MenuItem value={"Publish"}>Publish</MenuItem>
                  <MenuItem value={"Draft"}>Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <label>
                <Typography variant="caption">Tanggal Publikasi :</Typography>
                <input
                  type="date"
                  value={tgl_publikasi}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, tgl_publikasi: e.target.value })
                  }
                />
              </label>
            </Grid>
          </Grid>
          <Button
            onClick={id ? handleEdit : handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {id ? "Ubah" : "Buat"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormPost;
