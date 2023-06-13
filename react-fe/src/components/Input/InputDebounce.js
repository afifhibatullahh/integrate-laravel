import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

let timer;

const InputDebounce = (props) => {
  const { label, onChange, value, debounceTime, ...params } = props;
  const [val, setVal] = useState("");

  function debounce(func, timeout = 300) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, timeout);
  }

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleChangeVal = (event) => {
    const theValue = event.target.value;
    setVal(theValue);
    debounce(() => onChange(theValue), debounceTime);
  };

  return (
    <TextField
      sx={{ label: { fontSize: 12.5 } }}
      label={label}
      onChange={handleChangeVal}
      value={val}
      fullWidth
      size="small"
      {...params}
    />
  );
};

export default InputDebounce;
