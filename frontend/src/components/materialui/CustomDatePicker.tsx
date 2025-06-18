import * as React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { SxProps, Theme } from '@mui/material/styles';

const sizingProps = { width: "50%", minWidth: 100 };
const borderProps = { borderRadius: 1 };
const shadowProps = { boxShadow: 1 };
const paddingProps = { p: 1 };

export const DatePickerSizing = [sizingProps];
export const DatePickerBorder = [borderProps];
export const DatePickerShadow = [shadowProps];
export const DatePickerPadding = [paddingProps];

type CustomDatePickerProps = DatePickerProps & {
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  sx = [],
  styleArray = [],
  ...rest
}) => (
  <DatePicker
    {...rest}
    sx={[
      ...styleArray,
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  />
);

export default CustomDatePicker;