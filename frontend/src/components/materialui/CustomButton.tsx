import Button, { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps {
  
}

const CustomButton = (props: ButtonProps) => (
  <Button variant="contained"
    color="primary" {...props} />
);

export default CustomButton;