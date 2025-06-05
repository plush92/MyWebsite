import { Box, TextField } from '@mui/material';

const ContactForm: React.FC = () => {
  return (
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
