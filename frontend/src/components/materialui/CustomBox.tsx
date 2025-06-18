import Box, { BoxProps } from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

// Prop groupings
const sizingProps = { width: "80%", height: "80%" };
const borderProps = { border: '1px solid', borderRadius: 2 };
const shadowProps = { boxShadow: 0 };

export const BoxSizing = [sizingProps];
export const BoxBorder = [borderProps];
export const BoxShadow = [shadowProps];

type CustomBoxProps = BoxProps & {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
};

const CustomBox: React.FC<CustomBoxProps> = ({
  children,
  sx = [],
  styleArray = [],
  ...props // <-- Add this line
}) => (
  <Box
    {...props}
    sx={[
      ...styleArray,
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Box>
);

export default CustomBox;