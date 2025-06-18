import { useState } from "react";
import CustomContainer from "../components/materialui/CustomContainer";
import CustomBox from "../components/materialui/CustomBox";
import ContactForm from "../components/ContactForm";
import contactLinks from "../components/ContactLinks";
import { Link, Typography } from "@mui/material";
import BlogForm from "../components/blog/BlogForm";

const Blog: React.FC = () => {

    return (
      <CustomContainer>
        <BlogForm></BlogForm>
      </CustomContainer>
    );
  };
  
  export default Blog;