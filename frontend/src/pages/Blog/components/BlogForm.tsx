//to run, cd into the backend file and run node src/blogform/blogform.js
import { useState } from 'react';

import CustomBox, {
  BoxSizing,
  BoxBorder,
  BoxShadow,
} from '../../../components/materialui/CustomBox';
import CustomButton from '../../../components/materialui/CustomButton';
import CustomContainer, {
  ContainerBorder,
  ContainerMargin,
  ContainerPadding,
  ContainerSizing,
} from '../../../components/materialui/CustomContainer';
import CustomTextField, {
  TextFieldSizing,
  TextFieldBorder,
  TextFieldShadow,
} from '../../../components/materialui/CustomTextField';
import CustomRating, {
  RatingSizing,
  RatingColor,
} from '../../../components/materialui/CustomRating';
import CustomSearchBar from '../../../components/materialui/CustomSearchBar';

//Imports needed for DatePicker
import CustomDatePicker, {
  DatePickerBorder,
  DatePickerPadding,
  DatePickerShadow,
  DatePickerSizing,
} from '../../../components/materialui/CustomDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

//SQL Imports
import {
  createBlogPost,
  fetchBlogPostById,
  fetchBlogPosts,
  deleteBlogPost,
  updateBlogPost,
} from '../api/blogApi';

//Toast notifications
import { useToast } from '../../../components/ToastProvider';

const BlogForm: React.FC = () => {
  // Hook for toast notifications
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  //States
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [rating, setRating] = useState<number | null>(null);
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState<number | string>('');

  //Styling Props
  const CustomContainerProps = [
    ...ContainerBorder,
    ...ContainerMargin,
    ...ContainerPadding,
    ...ContainerSizing,
  ];

  const CustomBoxProps = [
    ...BoxSizing,
    ...BoxBorder,
    ...BoxShadow,
    { backgroundColor: '#f0f0f0' },
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
    ...DatePickerSizing,
  ];

  const CustomRatingProps = [...RatingSizing, ...RatingColor];

  //Event Handlers
  const handleCreate = async () => {
    try {
      const postData = {
        title,
        content,
        author,
        slug,
        date: date ? date.toISOString() : undefined,
      };

      console.log('Creating post with data:', postData);
      showInfo('Creating blog post...');

      await createBlogPost(postData);
      showSuccess('Blog post created successfully!');

      // Clear the form after successful creation
      setTitle('');
      setContent('');
      setAuthor('');
      setSlug('');
      setDate(new Date());
    } catch (error) {
      console.error('Error creating post:', error);
      showError('Failed to create blog post. Please try again.');
    }
  };

  const handleFetch = async () => {
    try {
      showInfo('Fetching blog posts...');
      const data = await fetchBlogPosts();
      setPosts(data);
      showSuccess(`Successfully fetched ${data.length} blog posts!`);
    } catch (error) {
      console.error('Error fetching posts:', error);
      showError('Failed to fetch blog posts. Please check your connection.');
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedId) {
        showWarning('Please select a post to update.');
        return;
      }

      showInfo('Updating blog post...');
      await updateBlogPost(selectedId, { comment: 'Updated comment!' });
      showSuccess('Blog post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      showError('Failed to update blog post. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedId) {
        showWarning('Please select a post to delete.');
        return;
      }

      // Ask for confirmation before deleting
      if (
        !window.confirm(
          'Are you sure you want to delete this post? This action cannot be undone.'
        )
      ) {
        return;
      }

      showInfo('Deleting blog post...');
      await deleteBlogPost(selectedId);
      showSuccess('Blog post deleted successfully!');

      // Clear selection and refresh posts
      setSelectedId('');
      handleFetch();
    } catch (error) {
      console.error('Error deleting post:', error);
      showError('Failed to delete blog post. Please try again.');
    }
  };

  return (
    <CustomContainer styleArray={CustomContainerProps} sx={{ m: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CustomBox sx={{ m: 6 }}>
          <CustomSearchBar></CustomSearchBar>
        </CustomBox>
        <CustomBox>
          <CustomDatePicker
            styleArray={CustomDatePickerProps}
            sx={{ m: 5 }}
            value={date}
            onChange={setDate}
          />
        </CustomBox>
      </LocalizationProvider>
      <CustomBox styleArray={CustomBoxProps} sx={{ m: 2 }}>
        <CustomTextField
          id="title"
          type="text"
          label="Title"
          value={title ?? ''}
          onChange={e => setTitle(e.target.value)}
          styleArray={CustomTextFieldProps}
          sx={{ mb: 2 }}
        />
        <CustomTextField
          id="author"
          type="text"
          label="Author"
          value={author ?? ''}
          onChange={e => setAuthor(e.target.value)}
          styleArray={CustomTextFieldProps}
          sx={{ mb: 2 }}
        />
        <CustomTextField
          id="slug"
          type="text"
          label="Slug"
          value={slug ?? ''}
          onChange={e => setSlug(e.target.value)}
          styleArray={CustomTextFieldProps}
          sx={{ mb: 2 }}
        />
        <CustomTextField
          id="content"
          type="text"
          label="Content"
          value={content ?? ''}
          onChange={e => setContent(e.target.value)}
          styleArray={CustomTextFieldProps}
          multiline
          rows={8}
          sx={{ mb: 0 }}
        />
      </CustomBox>
      <CustomBox>
        <CustomButton onClick={handleCreate}>Create</CustomButton>

        <CustomButton onClick={handleFetch}>Get</CustomButton>

        <CustomButton onClick={handleUpdate}>Update</CustomButton>

        <CustomButton onClick={handleDelete}>Delete</CustomButton>
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
