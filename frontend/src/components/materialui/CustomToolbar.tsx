import React from "react";
import { styled, SxProps, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const toolbarBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 56,
  px: 2,
  py: 1,
  backgroundColor: "#f5f5f5",
  borderRadius: 4,
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

export const ToolbarBase = [toolbarBase];

type CustomToolbarProps = {
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
  children?: React.ReactNode;
};

const StyledToolbar = styled(Box)(({ theme }) => ({
  ...toolbarBase,
}));

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  sx = [],
  styleArray = [],
  children,
}) => (
  <StyledToolbar
    sx={[
      ...styleArray,
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </StyledToolbar>
);

export default CustomToolbar;