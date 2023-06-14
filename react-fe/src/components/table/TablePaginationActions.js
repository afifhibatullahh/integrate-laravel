import { Box, IconButton } from "@mui/material";

export default function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  console.log(page, Math.max(Math.ceil(count / rowsPerPage)));
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(Math.ceil(count / rowsPerPage)));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page"
      >
        {"<<"}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="previous page"
      >
        {"<"}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="next page"
      >
        {">"}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="last page"
      >
        {">>"}
      </IconButton>
    </Box>
  );
}
