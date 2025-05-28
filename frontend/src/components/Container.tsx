import Container, { ContainerProps } from '@mui/material/Container';

const CustomContainer = (props: ContainerProps) => (
  <Container maxWidth="md" {...props} />
);

export default CustomContainer;