import React from "react";
import { useState } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

  //MainGame - main game logic
const MainGame: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
    const [card, setCard] = React.useState<{
      label: string;
      fips: string;
    } | null>(null);
    return (
      <Container>
        <Box>
          <Button>Deal</Button>
          <TextField
            value={player1name}
            onChange={handleplayer1NameChange}
            placeholder="Press Deal to Start!"
          />

          <TextField
            value={player2name}
            onChange={handleplayer2NameChange}
            placeholder="Press Deal to Start!"
          />
        </Box>
      </Container>
    );
  };
};

export default MainGame;
