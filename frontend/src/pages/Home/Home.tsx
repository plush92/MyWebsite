import CustomContainer from '../../components/materialui/CustomContainer';
import { Typography, Box, Divider } from '@mui/material';
import PageLayout from '../../components/PageLayout';
import introText from './components/introText';
import aboutText from './components/aboutText';
import featuredWorkText from './components/featuredWorkText';

type HomeProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

const Home: React.FC<HomeProps> = ({ mode, toggleMode }) => {
  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <CustomContainer>
        <Box mb={6} mt={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Who Am I?
          </Typography>
          {introText}
        </Box>
        <Divider sx={{ mb: 6 }} />
        <Box mb={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Featured Work
          </Typography>
          {featuredWorkText}
        </Box>
        <Divider sx={{ mb: 6 }} />
        <Box mb={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            About
          </Typography>
          {aboutText}
        </Box>
      </CustomContainer>
    </PageLayout>
  );
};

export default Home;

//Make links to featured work (github, present screenshots)
//Format text in a more readable format
