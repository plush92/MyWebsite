import { Link, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const contactLinks = [
  <Link
    key="linkedin"
    href="https://www.linkedin.com/in/brendan-d-04341574"
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
  >
    🔗 LinkedIn
  </Link>,
  <Typography key="sep1" variant="body1" sx={{ mx: 1 }}>|</Typography>,
  <Link
    key="email"
    href="mailto:bpduffy1231@gmail.com"
    underline="hover"
  >
    📧 Email
  </Link>,
  <Typography key="sep2" variant="body1" sx={{ mx: 1 }}>|</Typography>,
  <Link
    key="resume"
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
  >
    📄 Resume
  </Link>,
  <Typography key="sep3" variant="body1" sx={{ mx: 1 }}>|</Typography>,
  <Link
    key="github"
    href="https://github.com/plush92"
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
  >
    <GitHubIcon sx={{ verticalAlign: "middle" }} /> GitHub
  </Link>,
];

export default contactLinks;