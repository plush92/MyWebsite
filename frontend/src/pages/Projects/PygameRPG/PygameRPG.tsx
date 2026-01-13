import React from 'react';
import PageLayout from '../../../components/PageLayout';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import meadowImg from '../../../assets/PygameRPG/PygameMeadow.png';
import reviewImg from '../../../assets/PygameRPG/PhemoidReview.png';
import kitchenImg from '../../../assets/PygameRPG/PygameKitchen.png';

type ProjectProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

const PygameRPG: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Pygame RPG
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3 }}>
          A cozy 2D story game built with Python and Pygame
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            image={meadowImg}
            alt="Pygame RPG meadow scene"
            sx={{ maxHeight: 420, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              This personal project is a nostalgia‑inspired 2D RPG where you
              explore small scenes, interact with objects, and trigger scripted
              moments. I focused on clean state handling, scene transitions,
              collision, and lightweight cutscenes.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Chip label="Python" />
              <Chip label="Pygame" />
              <Chip label="Tile-based movement" />
              <Chip label="Scene system" />
              <Chip label="Dialogue & prompts" />
              <Chip label="Simple interactions" />
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={kitchenImg}
                alt="Kitchen scene"
                sx={{ height: 280, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Interactions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Objects and NPCs trigger prompts and simple scripted events.
                  UI hints guide the player to explore without heavy UI chrome.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={reviewImg}
                alt="Message feedback"
                sx={{ height: 280, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Player Feedback
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quick playtesting and feedback shaped the feel—short scenes,
                  readable prompts, and smooth transitions keep it approachable.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            href="https://github.com/plush92/lavgame"
            target="_blank"
            rel="noreferrer"
          >
            View Source
          </Button>
          <Button
            variant="outlined"
            href="mailto:brendan@example.com?subject=Pygame%20RPG"
          >
            Contact Me
          </Button>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default PygameRPG;
