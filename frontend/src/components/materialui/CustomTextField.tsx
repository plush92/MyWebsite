// CustomTextField: A wrapper around MUI TextField with grouped, reusable style props and full prop pass-through.
//
// Common TextField Props:
// - value, onChange, label, placeholder, type, error, helperText, required, disabled, multiline, rows, fullWidth, variant, size, InputProps, InputLabelProps, etc.
//
// Styling Props (sx):
// - color, backgroundColor, border, borderRadius, boxShadow, margin, padding, width, height, fontSize, fontWeight, etc.
//
// Usage Example:
// <CustomTextField
//   label="Name"
//   value={name}
//   onChange={e => setName(e.target.value)}
//   styleArray={[borderProps, sizingProps]}
//   sx={{ mb: 2 }}
// />

import { TextField, TextFieldProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

const sizingProps = { width: '100%', minWidth: 200 };
const borderProps = { borderRadius: 2 };
const shadowProps = { boxShadow: 1 };
const paddingProps = { p: 1 };
const fontProps = { fontSize: 16, fontWeight: 400 };

export const TextFieldSizing = [sizingProps];
export const TextFieldBorder = [borderProps];
export const TextFieldShadow = [shadowProps];
export const TextFieldPadding = [paddingProps];
export const TextFieldFont = [fontProps];

type CustomTextFieldProps = TextFieldProps & {
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  sx = [],
  styleArray = [],
  ...props
}) => (
  <TextField
    {...props}
    sx={[...styleArray, ...(Array.isArray(sx) ? sx : [sx])]}
  />
);

export default CustomTextField;
