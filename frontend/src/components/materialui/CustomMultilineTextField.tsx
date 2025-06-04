import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface CustomMultilineTextFieldProps {
  label?: string;
  rows?: number;
  defaultValue?: string;
}

export default function CustomMultilineTextField({
  label = "Multiline",
  rows = 4,
  defaultValue = "",
}: CustomMultilineTextFieldProps) {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-multiline-static"
        label={label}
        multiline
        rows={rows}
        defaultValue={defaultValue}
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
      />
    </Box>
  );
}