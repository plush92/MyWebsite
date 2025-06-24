import { useState } from "react";
import CustomContainer from "../../components/materialui/CustomContainer";
import CustomBox from "../../components/materialui/CustomBox";
import ContactForm from "./components/ContactForm";
import contactLinks from "./components/ContactLinks";
import { Link, Typography } from "@mui/material";

const Contact: React.FC = () => {

  return (
    <CustomContainer>
      <CustomBox sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography variant="h3">Contact Me!</Typography>
        <CustomBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {contactLinks}
        </CustomBox>
        <ContactForm />
      </CustomBox>
    </CustomContainer>
  );
};

export default Contact;