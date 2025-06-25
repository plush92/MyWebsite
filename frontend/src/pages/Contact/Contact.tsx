import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import CustomContainer from "../../components/materialui/CustomContainer";
import CustomBox from "../../components/materialui/CustomBox";
import ContactForm from "./components/ContactForm";
import contactLinks from "./components/ContactLinks";
import { Link, Typography } from "@mui/material";

type ContactProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

const Contact: React.FC<ContactProps> = ({mode, toggleMode}) => {

  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
    <CustomContainer>
      <CustomBox sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography variant="h3">Contact Me!</Typography>
        <CustomBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {contactLinks}
        </CustomBox>
        <ContactForm />
      </CustomBox>
      </CustomContainer>
      </PageLayout>
  );
};

export default Contact;