//Common Props:
// value: Sets the current rating value (e.g. 3.5). Use with onChange to control the component.
// defaultValue: Initial value for uncontrolled usage.
// onChange: Callback that fires when the rating changes.
// readOnly: If true, disables interaction but keeps visual display.
// disabled: Fully disables the rating component.
// max: Maximum number of stars (default is 5).
// precision: Minimum decimal step (e.g. 0.5 for half-stars).
// size: Sets star size ('small', 'medium', 'large').
// name: Sets the name for the underlying <input>s (important in forms).
// sx: For custom styles and overrides using MUI’s styling system.

//Icon Customization:
// icon: Custom icon to display when filled (e.g. your own SVG or component).
// emptyIcon: Icon to show for empty (unselected) stars.
// highlightSelectedOnly: If true, highlights only the selected icon instead of all up to the value.

//Interaction:
// getLabelText: Function to customize the screen reader label for accessibility.
// emptyLabelText: Label for the "empty" state when nothing is selected.
// onChangeActive: Callback that fires when the user hovers over a different value.

//Classes:
// .MuiRating-root	Root element
// .MuiRating-sizeSmall	When size is 'small'
// .MuiRating-sizeMedium	When size is 'medium'
// .MuiRating-sizeLarge	When size is 'large'
// .Mui-disabled	When disabled
// .Mui-readOnly	When readOnly
// .Mui-focusVisible	When keyboard focused
// .MuiRating-iconEmpty	For empty stars
// .MuiRating-iconFilled	For filled stars
// .MuiRating-iconHover	On hover
// .MuiRating-iconActive	When icon is clicked
// .MuiRating-iconFocus	On focus
// .MuiRating-labelEmptyValueActive	Special class for "no value" label

import Rating, { RatingProps } from '@mui/material/Rating';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const sizingProps = { fontSize: 32 };
const colorProps = { color: '#ff6d75' };
const spacingProps = { m: 1 };

export const RatingSizing = [sizingProps];
export const RatingColor = [colorProps];
export const RatingSpacing = [spacingProps];

type CustomRatingProps = RatingProps & {
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
};

const CustomRating: React.FC<CustomRatingProps> = ({
  sx = [],
  styleArray = [],
  ...props
}) => (
  <Rating
    {...props}
    sx={[...styleArray, ...(Array.isArray(sx) ? sx : [sx])]}
    icon={<FavoriteIcon fontSize="inherit" />}
    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
  />
);

export default CustomRating;
