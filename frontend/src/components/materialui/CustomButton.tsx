// // Core Behavior
// variant?: 'text' | 'outlined' | 'contained'; // Visual style
// color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit';
// disabled?: boolean; // Fully disables interaction
// disableElevation?: boolean; // Removes box shadow (only for contained)
// disableRipple?: boolean; // Disables ripple effect
// disableFocusRipple?: boolean; // Disables keyboard focus ripple

// // Layout
// size?: 'small' | 'medium' | 'large'; // Button size
// fullWidth?: boolean; // Expands to container width
// sx?: SxProps<Theme>; // Custom styling (MUI system)

// // Content
// startIcon?: React.ReactNode; // Icon before label
// endIcon?: React.ReactNode; // Icon after label
// children?: React.ReactNode; // Button label/text
// component?: React.ElementType; // Custom element (e.g. 'a', 'Link')
// href?: string; // Acts like a link if provided

// // Loading State
// loading?: boolean;
// loadingIndicator?: React.ReactNode;
// loadingPosition?: 'start' | 'center' | 'end';

// // Forms & Accessibility
// name?: string;
// type?: 'button' | 'submit' | 'reset';
// classes?: Partial<ButtonClasses>;

// // MUI Button Class Names
// .MuiButton-root                  // Root element
// .MuiButton-sizeSmall             // size="small"
// .MuiButton-sizeMedium            // size="medium"
// .MuiButton-sizeLarge             // size="large"
// .MuiButton-text                  // variant="text"
// .MuiButton-outlined              // variant="outlined"
// .MuiButton-contained             // variant="contained"

// .MuiButton-colorPrimary          // color="primary"
// .MuiButton-colorSecondary        // color="secondary"
// .MuiButton-colorSuccess          // color="success"
// .MuiButton-colorError            // color="error"
// .MuiButton-colorInfo             // color="info"
// .MuiButton-colorWarning          // color="warning"
// .MuiButton-colorInherit          // color="inherit"

// .Mui-disabled                    // Disabled state
// .Mui-focusVisible                // Focused via keyboard

// .MuiButton-startIcon             // Element for start icon
// .MuiButton-endIcon               // Element for end icon
// .MuiButton-fullWidth             // If fullWidth is true
// .MuiButton-disableElevation      // If disableElevation is true

// .MuiButton-loading               // Root when loading={true}
// .MuiButton-loadingIndicator      // Loading spinner wrapper
// .MuiButton-loadingWrapper        // Inner wrapper when loading
// .MuiButton-loadingPositionStart  // Spinner aligned left
// .MuiButton-loadingPositionCenter // Spinner aligned center
// .MuiButton-loadingPositionEnd    // Spinner aligned right

// // Implementation Example:
{
  /* <CustomButton
  styleArray={[...ButtonSizing, ...ButtonColor]}
  sx={{ mt: 2 }}
>
  Submit
</CustomButton> */
}

import Button, { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import { LinkProps } from 'react-router-dom';

const sizingProps = { minWidth: 120, minHeight: 40 };
const colorProps = { backgroundColor: '#1976d2', color: '#fff' };
const spacingProps = { m: 1, px: 3, py: 1 };

export const ButtonSizing = [sizingProps];
export const ButtonColor = [colorProps];
export const ButtonSpacing = [spacingProps];

type CustomButtonProps = ButtonProps &
  Partial<LinkProps> & {
    sx?: SxProps<Theme>;
    styleArray?: SxProps<Theme>[];
    children?: React.ReactNode;
  };

const CustomButton: React.FC<CustomButtonProps> = ({
  sx = [],
  styleArray = [],
  children,
  ...props
}) => (
  <Button
    variant="contained"
    {...props}
    sx={[...styleArray, ...(Array.isArray(sx) ? sx : [sx])]}
  >
    {children}
  </Button>
);

export default CustomButton;
