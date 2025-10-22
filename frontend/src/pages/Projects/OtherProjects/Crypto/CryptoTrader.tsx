import React from "react";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Input } from "@mui/icons-material";
import PageLayout from "../../../../components/PageLayout";
import Chart from "chart.js/auto";

//Project Props
type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

const CryptoDashboard: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <Container></Container>
    </PageLayout>
  );
};

export default CryptoDashboard;
