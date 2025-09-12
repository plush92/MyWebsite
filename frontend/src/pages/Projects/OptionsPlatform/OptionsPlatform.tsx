import React from "react";
import PageLayout from "../../../components/PageLayout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import marketsentiment from "../../../assets/OptionsPlatform/profile.png"
import plcalc from "../../../assets/OptionsPlatform/profile.png"
import portfolioanalysis from "../../../assets/OptionsPlatform/profile.png"
import profile from "../../../assets/OptionsPlatform/profile.png"

type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

const OptionsPlatform: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Options Trading Platform
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 3 }}>
          A React + MUI frontend for exploring option chains, tracking positions, and analyzing risk.
          Backend services are powered by Python/FastAPI for data ingestion and calculations.
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            image={marketsentiment}
            alt="Market Sentiment"
            sx={{ maxHeight: 420, objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              The platform focuses on fast quoting and clear portfolio insights. It provides a clean UI for
              chains, greeks, and P/L, with responsive layouts and accessible components using MUI.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              <Chip label="React" />
              <Chip label="TypeScript" />
              <Chip label="Material UI" />
              <Chip label="Python" />
              <Chip label="FastAPI" />
              <Chip label="Option Chains" />
              <Chip label="Greeks & P/L" />
              <Chip label="Risk Analytics" />
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={plcalc}
                alt="Options chains page"
                sx={{ height: 280, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Chains & Strategy Exploration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Filter by expiration and strike, surface greeks, and compare calls vs. puts quickly.
                  Built with reusable data grids and MUI components for clean interaction.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={portfolioanalysis}
                alt="Risk analytics"
                sx={{ height: 280, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Positions, Greeks, and Risk
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track open positions, delta exposure, and running P/L. Visual components emphasize
                  readable metrics and responsive layouts across devices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default OptionsPlatform;