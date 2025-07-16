//to run, cd into the backend file and run node src/blogform/blogform.js
import { useState } from "react";

import CustomBox, { BoxSizing, BoxBorder, BoxShadow } from "../../../components/materialui/CustomBox";
import CustomButton from "../../../components/materialui/CustomButton";
import CustomContainer, {ContainerBorder, ContainerMargin, ContainerPadding, ContainerSizing} from "../../../components/materialui/CustomContainer";
import CustomTextField, { TextFieldSizing, TextFieldBorder, TextFieldShadow } from "../../../components/materialui/CustomTextField";
import CustomRating, { RatingSizing, RatingColor } from "../../../components/materialui/CustomRating";

//Imports needed for DatePicker
import CustomDatePicker, { DatePickerBorder, DatePickerPadding, DatePickerShadow, DatePickerSizing } from "../../../components/materialui/CustomDatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

//SQL Imports
import { createBlogPost, fetchBlogPostById, fetchBlogPosts, deleteBlogPost, updateBlogPost } from "../api/blogApi";

const BlogForm: React.FC = () => {
    //States
    const [date, setDate] = useState<Date | null>(new Date());
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [posts, setPosts] = useState([]);
    const [selectedId, setSelectedId] = useState<number | string>("");
  
    
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
  
    //Event Handlers
    const handleCreate = async () => {
      await createBlogPost({ date: new Date().toISOString(), comment: "New post!" });
      alert("Post created!");
    };

    const handleFetch = async () => {
      const data = await fetchBlogPosts();
      setPosts(data);
      alert("Post fetched!");
    };

    const handleUpdate = async () => {
      await updateBlogPost(selectedId, { comment: "Updated comment!" });
      alert("Post updated!");
    };

    const handleDelete = async () => {
      await deleteBlogPost(selectedId);
      alert("Post deleted!");
    };

  return (
        <CustomContainer styleArray={CustomContainerProps} sx={{ m: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CustomDatePicker
            styleArray={CustomDatePickerProps}
            sx={{ m: 5 }}
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
        
      <CustomBox>
        <CustomButton onClick={handleCreate}>
            Create
        </CustomButton>

                <CustomButton onClick={handleFetch}>
            Get
        </CustomButton>

                <CustomButton onClick={handleUpdate}>
            Update
        </CustomButton>

                <CustomButton onClick={handleDelete}>
            Delete
        </CustomButton>
        </CustomBox>

        <CustomRating
          value={0}
          onChange={(_, newValue) => setRating(newValue)}
          styleArray={[...RatingSizing, ...RatingColor]}
          sx={{ mt: 2 }}
        />
    </CustomContainer>
      );
};


export default BlogForm;
