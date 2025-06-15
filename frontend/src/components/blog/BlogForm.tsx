//to run, cd into the backend file and run node src/blogform/blogform.js
import { useState } from "react";
import CustomBox, { BoxSizing, BoxBorder, BoxShadow } from "../materialui/CustomBox";
import CustomButton from "../materialui/CustomButton";
import CustomTextField, { TextFieldSizing, TextFieldBorder, TextFieldShadow } from "../materialui/CustomTextField";

const BlogForm: React.FC = () => {
    //State management
    const [date, setDate] = useState("");
    const [comment, setComment] = useState("");
    
    const CustomBoxProps = [
        ...BoxSizing,
        ...BoxBorder,
        ...BoxShadow,
        { backgroundColor: "#f0f0f0" }, 
    ];
    
    const CustomTextFieldProps = [
        ...TextFieldSizing,
        ...TextFieldBorder,
        ...TextFieldShadow,
        { backgroundColor: "#FFF000" }, 
      ];

    const handleSubmit = async () => {
        try {
            // @ts-ignore
            await fetch(`${(import.meta as any).env.REACT_APP_API_URL || "http://localhost:3001"}/blog`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date, comment }),
            });
            setDate("");
            setComment("");
        } catch (err) {
            alert("Failed to send.");
        }
    };

    return (
        <CustomBox styleArray={CustomBoxProps} sx={{ m: 5 }}>
            <CustomTextField 
                    id="comment"
                    type="comment"
                    label="Comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    styleArray={CustomTextFieldProps}
                    sx={{ mb: 2 }}
                  />
        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
        </CustomBox>
    )
};


export default BlogForm;
