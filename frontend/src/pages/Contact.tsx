import { useState } from "react";
import SuggestionBox from "../components/SuggestionBox";
import CustomSlider from "../components/materialui/CustomSlider";
import CustomContainer from "../components/materialui/CustomContainer";
import CustomBox from "../components/materialui/CustomBox";
import ContactForm from "../components/ContactForm";
import { Typography } from "@mui/material";

const Contact: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(100);

  return (
    <CustomContainer>
      <CustomBox sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography>Contact Me!</Typography>
        <ContactForm></ContactForm>
      </CustomBox>
      <CustomBox sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4}}>
      <Typography>Suggestion Box</Typography>
      <SuggestionBox />
      <CustomSlider
        value={sliderValue}
        onChange={(_, val) => setSliderValue(val as number)}
        min={0}
        max={100}
        sx={{ width: 300 }}
        />
        </CustomBox>
    </CustomContainer>
  );
};

export default Contact;