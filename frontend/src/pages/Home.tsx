import CustomContainer from "../components/materialui/CustomContainer";
import { Typography } from "@mui/material";

const Home: React.FC = () => {
    return (
        <CustomContainer>
            <Typography variant="h5" fontWeight="bold" mb={6}>
       Header/Introduction
            </Typography>
            <Typography variant="h5" fontWeight="bold" mb={6}>
       Featured Work
            </Typography>
            <Typography variant="h5" fontWeight="bold" mb={6}>
       About
            </Typography>

      </CustomContainer>
    );
  }
  
  export default Home;