// Have a scale to rate their opinion of the site
// Leave a suggestion/comment
// Leave name (optional)
// After they leave the comment, it says "Thank you. Unfortunately your opinion will not be considered at this time."

import React, { useState } from "react";
import CustomMultilineTextField from "./materialui/CustomMultilineTextField";
import CustomButton from "./materialui/CustomButton";
import { Box } from "@mui/material";

const SuggestionBox: React.FC = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    alert("Thank you. Unfortunately your opinion will not be considered at this time.");
    setComment("");
  };

  return (
    <Box>
      <CustomMultilineTextField
        label="Leave a comment"
        rows={6}
        defaultValue={comment}
        // To make it controlled, add onChange:
        // onChange={(e) => setComment(e.target.value)}
      />
      <CustomButton onClick={handleSubmit}>Submit</CustomButton>
    </Box>
  );
};

export default SuggestionBox;