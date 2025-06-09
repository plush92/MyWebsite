import CustomContainer from "../components/materialui/CustomContainer";
import { Typography, Box, Divider } from "@mui/material";
import introText from "../components/home/introText";
import aboutText from "../components/home/aboutText";
import featuredWorkText from "../components/home/featuredWorkText";

const Home: React.FC = () => {
  return (
    <CustomContainer >
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
  );
};

export default Home;
  
//Make links to featured work (github, present screenshots)
//Format text in a more readable format
