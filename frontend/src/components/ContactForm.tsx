import { Box, TextField, FormHelperText, Typography } from '@mui/material';

const ContactForm: React.FC = () => {
  return (
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h3" >
              Contact Me!
          </Typography>
      <TextField
        id="email"
        type="email"
        label="Email"
        helperText="I'll never share your email."
      />
      <TextField
        id="phone"
        type="tel"
        label="Phone"
      />
    </Box>
  );
};

export default ContactForm;
