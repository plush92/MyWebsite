import Container, { ContainerProps } from '@mui/material/Container';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

// Prop groupings
const sizingProps = { maxWidth: 'md', width: '100%' };
const paddingProps = { p: 3 };
const marginProps = { m: 'auto' };
const borderProps = { borderRadius: 3 };

export const ContainerSizing = [sizingProps];
export const ContainerPadding = [paddingProps];
export const ContainerMargin = [marginProps];
export const ContainerBorder = [borderProps];

type CustomContainerProps = ContainerProps & {
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
};

const CustomContainer: React.FC<CustomContainerProps> = ({
  children,
  sx = [],
  styleArray = [],
  ...props
}) => (
  <Container
    {...props}
    sx={[...styleArray, ...(Array.isArray(sx) ? sx : [sx])]}
  >
    {children}
  </Container>
);

export default CustomContainer;
