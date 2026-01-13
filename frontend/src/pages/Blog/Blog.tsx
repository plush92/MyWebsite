import CustomContainer from '../../components/materialui/CustomContainer';
import BlogForm from './components/BlogForm';
import PageLayout from '../../components/PageLayout';

type BlogProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

const Blog: React.FC<BlogProps> = ({ mode, toggleMode }) => {
  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <CustomContainer>
        <BlogForm></BlogForm>
      </CustomContainer>
    </PageLayout>
  );
};

export default Blog;
