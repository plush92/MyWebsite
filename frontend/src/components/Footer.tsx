import { Typography } from '@mui/material';
import CustomBox, {
  BoxSizing,
  BoxBorder,
  BoxShadow,
} from './materialui/CustomBox';

const currentDate = new Date();
const year: number = currentDate.getFullYear();
const name: string = 'Brendan Duffy';

const Footer: React.FC = () => (
  <CustomBox
    styleArray={[
      ...BoxSizing,
      ...BoxBorder,
      ...BoxShadow,
      {
        backgroundColor: theme =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.primary.main,
        color: theme =>
          theme.palette.mode === 'dark'
            ? theme.palette.text.primary
            : theme.palette.primary.contrastText,
        width: '100%',
        py: 2,
        textAlign: 'center',
        mt: 'auto',
        borderTop: theme =>
          theme.palette.mode === 'dark'
            ? `1px solid ${theme.palette.grey[700]}`
            : 'none',
      },
    ]}
    component="footer"
  >
    <Typography variant="body2">Created by {name}</Typography>
    <Typography variant="body2">{year}</Typography>
  </CustomBox>
);

export default Footer;
