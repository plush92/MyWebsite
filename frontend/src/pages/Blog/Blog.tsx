import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Create,
  Delete,
  CalendarToday,
} from '@mui/icons-material';
import PageLayout from '../../components/PageLayout';
import { useToast } from '../../components/ToastProvider';
import {
  createBlogPost,
  fetchBlogPosts,
  deleteBlogPost,
  updateBlogPost,
} from './api/blogApi';

type BlogProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  slug: string;
  created_at: string;
}

const Blog: React.FC<BlogProps> = ({ mode, toggleMode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [slug, setSlug] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const { showSuccess, showError, showInfo } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogPosts();
      setPosts(data);
      showInfo(`Loaded ${data.length} blog posts`);
    } catch (error) {
      showError('Failed to load blog posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async () => {
    if (!title.trim() || !content.trim() || !author.trim()) {
      showError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const postData = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        slug:
          slug.trim() ||
          title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, ''),
      };

      if (editingPost) {
        await updateBlogPost(editingPost.id, postData);
        showSuccess('Post updated successfully!');
      } else {
        await createBlogPost(postData);
        showSuccess('Post created successfully!');
      }

      handleCloseDialog();
      loadPosts();
    } catch (error) {
      showError(
        editingPost ? 'Failed to update post' : 'Failed to create post'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteBlogPost(id);
      showSuccess('Post deleted successfully!');
      loadPosts();
    } catch (error) {
      showError('Failed to delete post');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setSlug(post.slug);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingPost(null);
    setTitle('');
    setContent('');
    setAuthor('');
    setSlug('');
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setTitle('');
    setContent('');
    setAuthor('');
    setSlug('');
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" gutterBottom>
            Blog
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Thoughts, updates, and insights from the development journey
          </Typography>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {posts.length === 0 && !loading && (
            <Alert severity="info">
              No blog posts yet. Create your first post to get started!
            </Alert>
          )}

          {posts.length > 0 && (
            <Stack spacing={3}>
              {posts.map(post => (
                <Card
                  key={post.id}
                  sx={{
                    bgcolor: 'background.paper',
                    '&:hover': {
                      boxShadow: theme => theme.shadows[4],
                    },
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h5" component="h2" gutterBottom>
                        {post.title}
                      </Typography>
                      <Box>
                        <Button
                          size="small"
                          startIcon={<Create />}
                          onClick={() => handleEditPost(post)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Chip
                        icon={<CalendarToday />}
                        label={formatDate(post.created_at)}
                        size="small"
                        variant="outlined"
                      />
                      <Typography variant="body2" color="text.secondary">
                        by {post.author}
                      </Typography>
                      <Chip
                        label={post.slug}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.6,
                      }}
                    >
                      {post.content.length > 300
                        ? `${post.content.substring(0, 300)}...`
                        : post.content}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          <Fab
            color="primary"
            onClick={handleNewPost}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
            }}
          >
            <AddIcon />
          </Fab>

          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {editingPost ? 'Edit Post' : 'New Blog Post'}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3} sx={{ pt: 1 }}>
                <TextField
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
                <TextField
                  label="Author"
                  fullWidth
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  required
                />
                <TextField
                  label="Slug (URL-friendly version)"
                  fullWidth
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  helperText="Leave empty to auto-generate from title"
                />
                <TextField
                  label="Content"
                  fullWidth
                  multiline
                  rows={8}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={handleSavePost}
                variant="contained"
                disabled={loading}
              >
                {loading ? 'Saving...' : editingPost ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default Blog;
