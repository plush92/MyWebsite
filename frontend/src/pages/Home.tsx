import CustomContainer from "../components/materialui/CustomContainer";
import { Typography } from "@mui/material";

const Home: React.FC = () => {
    return (
        <CustomContainer>
            <Typography variant="h4" fontWeight="bold" mb={6}>
       Header/Introduction
            </Typography>
            <Typography variant="h4" fontWeight="bold" mb={6}>
       Featured Work
            </Typography>
            <Typography variant="h4" fontWeight="bold" mb={6}>
       About
            </Typography>
            <Typography variant="h3" fontWeight="bold" mb={6}>
        Contact: [🔗 LinkedIn] [📧 Email] [💬 Contact Form]
      </Typography>

      </CustomContainer>
    );
  }
  
  export default Home;