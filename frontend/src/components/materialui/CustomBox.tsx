//Box props:
//Use sx to control styling/css
//Borders: border, borderColor, borderRadius
//Display: displayPrint
//Grid: gap, rowGap, columnGap
//Palette: color, backgroundColor
//Positions: zIndex
//Shadows: boxShadow
//Sizing: width, height, minHeight, maxHeight, minWidth, and maxWidth
//Spacing: margin, padding (there are also many shorthand/aliases (m = margin, mt = margin-top, etc. check documentation))
//Typography: fontFamily, fontSize, fontStyle, fontWeight
//Responsive Values: 
//You can also apply array values

import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

//Prop groupings
const sizingProps = { width: 500, height: 500 };
const borderProps = { border: '1px solid', borderRadius: 2 };
const shadowProps = { boxShadow: 0 };

export const BoxSizing = [sizingProps];
export const BoxBorder = [borderProps];
export const BoxShadow = [shadowProps];

interface CustomBoxProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
}

const CustomBox: React.FC<CustomBoxProps> = ({
  children,
  sx = [],
  styleArray = [],
}) => (
  <Box
    sx={[
      ...styleArray,
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Box>
);

export default CustomBox;