//to run, cd into the backend file and run node src/contactform/contactform.js

import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import CustomButton from "./materialui/CustomButton";

const UnifiedContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      // @ts-ignore
            await fetch(`${(import.meta as any).env.REACT_APP_API_URL || "http://localhost:3001"}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, comment }),
            });
      setName("");
      setEmail("");
      setPhone("");
      setComment("");
    } catch (err) {
      alert("Failed to send.");
    }
    };
    
  //   try {
  //     await fetch("http://localhost:3001/contact", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ comment }),
  //     });
  //     alert("Thank you. Unfortunately your opinion will not be considered at this time :)");
  //     setComment("");
  //   } catch (err) {
  //     alert("Failed to send.");
  //   }
  // };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField 
        id="name"
        type="name"
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        id="email"
        type="email"
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        helperText="I'll never share your email"
      />
      <TextField
        id="phone"
        type="tel"
        label="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        helperText="or your phone number..."
      />
      <TextField
        id="comment"
        label="Leave a comment"
        multiline
        rows={6}
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <CustomButton onClick={handleSubmit}>Submit</CustomButton>
    </Box>
  );
};

export default UnifiedContactForm;
