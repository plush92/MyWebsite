//Blog page
//Track progress thru github calendar/projects
//Update thoughts/feelings about project + working thru things and learning & philosophy
//Include personality type (introspective pattern seeking, emotional) and describe how you set up everything to be the best you can be
//Date, description. Scale 1-5 (frown to smile) for how you were feeling before you started, and then again after you're done
//In between, have prompts to direct your writings to be more organized/centered/focused

//create page, navigation links
//create basic blog frontend (you can ignore the github stuff for now, the more complicated, just keep it simple)
//create backend to handle data storage

import { useState } from "react";
import CustomContainer from "../components/materialui/CustomContainer";
import CustomBox from "../components/materialui/CustomBox";
import ContactForm from "../components/ContactForm";
import contactLinks from "../components/ContactLinks";
import { Link, Typography } from "@mui/material";

const Blog: React.FC = () => {

    return (
      <CustomContainer>
        <CustomBox sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
          <Typography variant="h3">Blog</Typography>
          <CustomBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {contactLinks}
          </CustomBox>
          <ContactForm />
        </CustomBox>
      </CustomContainer>
    );
  };
  
  export default Blog;