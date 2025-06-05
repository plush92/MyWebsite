import { useState } from "react";
import CommentBox from "../components/SuggestionBox";
import CustomContainer from "../components/materialui/CustomContainer";
import CustomBox from "../components/materialui/CustomBox";
import ContactForm from "../components/ContactForm";
import { Link, Typography } from "@mui/material";

const Contact: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(100);

  return (
    <CustomContainer>
      <CustomBox sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography variant="h3">Contact Me!</Typography>
        <CustomBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link
            href="https://www.linkedin.com/in/brendan-d-04341574"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            🔗 LinkedIn
          </Link>
          <Typography variant="body1" sx={{ mx: 1 }}>|</Typography>
          <Link
            href="mailto:bpduffy1231@gmail.com"
            underline="hover"
          >
            📧 Email
          </Link>
          <Typography variant="body1" sx={{ mx: 1 }}>|</Typography>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            📄 Resume
          </Link>
          <Typography variant="body1" sx={{ mx: 1 }}>|</Typography>
          <Link
            href="https://github.com/plush92"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            🐙 GitHub
          </Link>
        </CustomBox>
        <ContactForm />
        <CommentBox />
      </CustomBox>
    </CustomContainer>
  );
};

export default Contact;