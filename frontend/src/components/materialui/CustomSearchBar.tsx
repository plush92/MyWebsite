import React from 'react';
import { styled, alpha, SxProps, Theme } from '@mui/material/styles';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const searchSizing = { width: 240, minHeight: 40 };
const searchColor = { backgroundColor: '#fff', color: '#333' };
const searchBorder = { borderRadius: 2, border: '1px solid #ccc' };
const searchSpacing = { m: 1, px: 2, py: 0.5 };

export const SearchSizing = [searchSizing];
export const SearchColor = [searchColor];
export const SearchBorder = [searchBorder];
export const SearchSpacing = [searchSpacing];

type CustomSearchBarProps = InputBaseProps & {
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
  placeholder?: string;
  icon?: React.ReactNode;
};

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  ...searchSizing,
  ...searchBorder,
  ...searchColor,
  ...searchSpacing,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#888',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  sx = [],
  styleArray = [],
  placeholder = 'Search…',
  icon,
  ...props
}) => (
  <SearchContainer sx={[...styleArray, ...(Array.isArray(sx) ? sx : [sx])]}>
    <SearchIconWrapper>{icon || <SearchIcon />}</SearchIconWrapper>
    <StyledInputBase
      placeholder={placeholder}
      inputProps={{ 'aria-label': 'search' }}
      {...props}
    />
  </SearchContainer>
);

export default CustomSearchBar;
