//to run, cd into the backend file and run node src/blogform/blogform.js
import { useState } from "react";

import CustomBox, { BoxSizing, BoxBorder, BoxShadow } from "../../../components/materialui/CustomBox";
import CustomButton from "../../../components/materialui/CustomButton";
import CustomContainer, {ContainerBorder, ContainerMargin, ContainerPadding, ContainerSizing} from "../../../components/materialui/CustomContainer";
import CustomTextField, { TextFieldSizing, TextFieldBorder, TextFieldShadow } from "../../../components/materialui/CustomTextField";

//Imports needed for DatePicker
import CustomDatePicker, { DatePickerBorder, DatePickerPadding, DatePickerShadow, DatePickerSizing } from "../../../components/materialui/CustomDatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import CustomRating, { RatingSizing, RatingColor } from "../../../components/materialui/CustomRating";

const BlogForm: React.FC = () => {
    //States
    const [date, setDate] = useState<Date | null>(new Date());
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    
    //Styling Props
    const CustomContainerProps = [
        ...ContainerBorder,
        ...ContainerMargin,
        ...ContainerPadding,
        ...ContainerSizing,
    ]

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
        // { backgroundColor: "#FFF000" },
      ];

    const CustomDatePickerProps = [
        ...DatePickerBorder,
        ...DatePickerPadding,
        ...DatePickerShadow,
        ...DatePickerSizing
    ]
    
    const CustomRatingProps = [
      ...RatingSizing,
      ...RatingColor,
      ]
  
    const handleSubmit = async () => {
        try {
            await fetch(`${(import.meta as any).env.REACT_APP_API_URL || "http://localhost:3001"}/blog`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    date: date ? date.toString() : null,
                    comment 
                }),
            });
            setDate(new Date());
            setComment("");
        } catch (err) {
            alert("Failed to send.");
        }
    };

  return (
        <CustomContainer styleArray={CustomContainerProps} sx={{ m: 5 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CustomDatePicker
            styleArray={CustomDatePickerProps}
            sx={{ m: 2 }}
            value={date}
            onChange={setDate}
                />
                </LocalizationProvider>
          <CustomBox styleArray={CustomBoxProps} sx={{ m: 5 }}>
            <CustomTextField
              id="comment"
              type="comment"
              label="Comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              styleArray={CustomTextFieldProps}
              multiline
              rows={8}
              sx={{ mb: 0 }}
            />
        </CustomBox>
        
        <CustomButton onClick={handleSubmit}>
            Submit
        </CustomButton>

        <CustomRating
          value={3}
          onChange={(_, newValue) => setRating(newValue)}
          styleArray={[...RatingSizing, ...RatingColor]}
          sx={{ mt: 2 }}
        />
    </CustomContainer>
      );
};


export default BlogForm;
