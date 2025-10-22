import React, { useState } from "react";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

type ChartType = "candlestick" | "line" | "area" | "ohlc";
type TimeInterval = "1m" | "5m" | "15m" | "1h" | "4h" | "1d" | "1w";

type InputProps = {
  assetSelection: string;
  dateRange: string;
  chartType: ChartType;
  timeInterval: TimeInterval;
  indicators?: string[];
  compareAsset?: string;
};

const UserInput: React.FC<InputProps> = ({
  assetSelection,
  dateRange,
  chartType,
  timeInterval,
  indicators,
  compareAsset,
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleAssetSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Handle asset selection change
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        <TextField
          id="assetselection"
          variant="standard"
          label="Asset Selection"
          size="small"
          value={assetSelection}
          onChange={handleAssetSelectionChange}
        />

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Date Range
          </Typography>
          <Stack direction="row" spacing={2}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
              minDate={startDate} // Ensure end date is after start date
            />
          </Stack>
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};

export default UserInput;
