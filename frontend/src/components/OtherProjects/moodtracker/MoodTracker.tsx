// box, container from tailwind.

import CustomBox from "../../materialui/CustomBox";
import CustomContainer from "../../materialui/CustomContainer";
import { Grid, Paper, Box, Container, Rating, TextField } from "@mui/material";
import PageLayout from "../../PageLayout";

type LayoutProps = {
    mode: "light" | "dark";
    toggleMode: () => void;
  };


const MoodTracker: React.FC<LayoutProps> = ({mode, toggleMode}) => {
    const Paper_item = "Paper text";
    const Box_item = "Box text";
    const Container_item = "Container text";

    return (
        <PageLayout mode={mode} toggleMode={toggleMode}>
            <Grid>
        <Paper>
                    <Rating>
                    </Rating>
                </Paper>
                <Paper>
                    <TextField multiline>
                        
</TextField>
                </Paper>
        <CustomBox>
            {Box_item}
        </CustomBox>
        <CustomContainer>
            {Container_item}
        </CustomContainer>
            </Grid>
            </PageLayout>
    );
};

export default MoodTracker;
