import * as React from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';

interface CustomSliderProps extends SliderProps {
  value: number;
  onChange: (event: Event, value: number | number[]) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ value, onChange, ...props }) => (
  <Slider
    value={value}
    onChange={onChange}
    aria-label="custom-slider"
    {...props}
  />
);

export default CustomSlider;
