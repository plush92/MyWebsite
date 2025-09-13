import React from "react";
import PageLayout from "../../../components/PageLayout";
import {
  Container, Box, Grid, Typography, Autocomplete, TextField,
  Button, Card, CardContent, Chip, Stack, Divider
} from "@mui/material";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { STATES } from "./States"
import { fetchCountiesByState, fetchMetricsForState, fetchMetricsForCounty } from "./censusApi";

type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

type GeoKey = { kind: "state"; stateFips: string } | { kind: "county"; stateFips: string; countyFips: string };
type GeoChoice = { label: string; key: GeoKey };

type Metrics = {
  name: string;
  population: number;
  medianIncome: number;     // B19013_001E
  age: { children: number; adults: number; seniors: number }; // derived from B01001
};

const AGE_COLORS = ["#7cb1ff", "#9ccc65", "#ffb74d"];

const CensusExplorer: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  const [stateChoice, setStateChoice] = React.useState<{ label: string; fips: string } | null>(null);
  const [counties, setCounties] = React.useState<Array<{ label: string; countyFips: string }>>([]);
  const [countyChoice, setCountyChoice] = React.useState<{ label: string; countyFips: string } | null>(null);

  const [selected, setSelected] = React.useState<GeoChoice[]>([]);
  const [data, setData] = React.useState<Record<string, Metrics>>({});
  const [loadingKey, setLoadingKey] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Load counties when a state is picked
  React.useEffect(() => {
    (async () => {
      setCountyChoice(null);
      if (!stateChoice) return setCounties([]);
      try {
        const list = await fetchCountiesByState(stateChoice.fips);
        setCounties(list);
      } catch (e) {
        console.error(e);
        setCounties([]);
      }
    })();
  }, [stateChoice]);

  const addSelection = async (key: GeoKey, label: string) => {
    const id = JSON.stringify(key);
    if (selected.some(s => JSON.stringify(s.key) === id)) return; // already added
    setSelected(prev => [...prev, { key, label }]);

    setLoadingKey(id);
    setError(null);
    try {
      const metrics = key.kind === "state"
        ? await fetchMetricsForState(key.stateFips)
        : await fetchMetricsForCounty(key.stateFips, key.countyFips);

      setData(prev => ({ ...prev, [id]: metrics }));
    } catch (e: any) {
      console.error(e);
      setError("Failed to load Census data. Try again.");
    } finally {
      setLoadingKey(null);
    }
  };

  const removeSelection = (id: string) => {
    setSelected(prev => prev.filter(s => JSON.stringify(s.key) !== id));
    setData(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const incomeCompare = selected
    .map(s => {
      const id = JSON.stringify(s.key);
      const m = data[id];
      return m ? { name: m.name, MedianIncome: m.medianIncome } : null;
    })
    .filter(Boolean) as { name: string; MedianIncome: number }[];

  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          U.S. Demographics Explorer
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 3 }}>
          Select a state or county to view population, median income, and age distribution (ACS 5‑Year).
          Compare multiple locations side‑by‑side.
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={STATES.map(s => ({ label: s.name, fips: s.fips }))}
                  value={stateChoice}
                  onChange={(_, v) => setStateChoice(v)}
                  renderInput={(params) => <TextField {...params} label="State" />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={counties}
                  value={countyChoice}
                  onChange={(_, v) => setCountyChoice(v)}
                  renderInput={(params) => <TextField {...params} label="County (optional)" />}
                  disabled={!stateChoice}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    disabled={!stateChoice || loadingKey !== null}
                    onClick={() => {
                      if (!stateChoice) return;
                      if (countyChoice) {
                        addSelection(
                          { kind: "county", stateFips: stateChoice.fips, countyFips: countyChoice.countyFips },
                          `${countyChoice.label}, ${stateChoice.label}`
                        );
                      } else {
                        addSelection(
                          { kind: "state", stateFips: stateChoice.fips },
                          stateChoice.label
                        );
                      }
                    }}
                  >
                    {loadingKey ? "Loading…" : "Add to Compare"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelected([]);
                      setData({});
                    }}
                  >
                    Clear
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {error && (
          <Box sx={{ color: "error.main", mb: 2 }}>{error}</Box>
        )}

        {/* Selected chips */}
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
          {selected.map(s => {
            const id = JSON.stringify(s.key);
            return (
              <Chip
                key={id}
                label={s.label}
                onDelete={() => removeSelection(id)}
                color={data[id] ? "primary" : "default"}
              />
            );
          })}
        </Stack>

        {/* Detail cards for each selection */}
        <Grid container spacing={3}>
          {selected.map(s => {
            const id = JSON.stringify(s.key);
            const m = data[id];
            return (
              <Grid item xs={12} md={6} key={id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {m ? m.name : s.label}
                    </Typography>
                    {m ? (
                      <>
                        <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
                          <Box>
                            <Typography variant="overline" display="block">Population</Typography>
                            <Typography variant="h5">{m.population.toLocaleString()}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="overline" display="block">Median Income</Typography>
                            <Typography variant="h5">${m.medianIncome.toLocaleString()}</Typography>
                          </Box>
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Age Distribution</Typography>
                        <Box sx={{ height: 240 }}>
                          <ResponsiveContainer>
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Children (0–17)", value: m.age.children },
                                  { name: "Adults (18–64)", value: m.age.adults },
                                  { name: "Seniors (65+)", value: m.age.seniors },
                                ]}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={50}
                                outerRadius={80}
                                label
                              >
                                {AGE_COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                              </Pie>
                              <Legend />
                              <RTooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </Box>
                      </>
                    ) : (
                      <Typography color="text.secondary">Loading…</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Comparison chart */}
        {incomeCompare.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Median Household Income (compare)</Typography>
            <Box sx={{ height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={incomeCompare}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RTooltip />
                  <Legend />
                  <Bar dataKey="MedianIncome" fill="#42a5f5" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}
      </Container>
    </PageLayout>
  );
};

export default CensusExplorer;