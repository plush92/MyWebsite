//to run, cd into the backend file and run node src/contactform/contactform.js

import React, { useState } from "react";
import CustomTextField from "../../../components/materialui/CustomTextField";
import CustomBox from "../../../components/materialui/CustomBox";
import CustomButton from "../../../components/materialui/CustomButton";

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
    <CustomBox
      component="form"
      styleArray={[
        {
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 500,
          mx: 'auto',
          mt: 4,
        },
      ]}>
      <CustomTextField 
        id="name"
        type="name"
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <CustomTextField
        id="email"
        type="email"
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        helperText="I'll never share your email"
      />
      <CustomTextField
        id="phone"
        type="tel"
        label="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        helperText="or your phone number..."
      />
      <CustomTextField
        id="comment"
        label="Leave a comment"
        multiline
        rows={6}
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <CustomButton onClick={handleSubmit}>Submit</CustomButton>
    </CustomBox>
  );
};

export default UnifiedContactForm;
