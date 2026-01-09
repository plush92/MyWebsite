// Minimal Census API helpers (ACS 5-year 2022)
const YEAR = "2022";
const BASE = `https://api.census.gov/data/${YEAR}/acs/acs5`;

// Convert string numbers safely
const n = (v: string | undefined) => (v ? Number(v) : 0);

// Census API response types
type CensusApiResponse = string[][];
type CountyResponse = [string, string, string]; // [name, state, county]

export async function fetchCountiesByState(stateFips: string) {
  const url = `${BASE}?get=NAME&for=county:*&in=state:${stateFips}`;
  const res = await fetch(url);
  const json: CensusApiResponse = await res.json();
  // json[0] is header
  return json.slice(1).map((row: CountyResponse) => ({
    label: row[0] as string,
    countyFips: row[2] as string,
  }));
}

export type Metrics = {
  name: string;
  population: number;
  medianIncome: number;
  age: { children: number; adults: number; seniors: number };
};

// Helper to parse a single response row into Metrics
function toMetrics(row: string[], geoNameIndex = 0): Metrics {
  const NAME = row[geoNameIndex];

  const total = n(row[1]); // B01001_001E

  // Children (0–17): Male 003-006, Female 027-030
  const kids =
    n(row[2]) +
    n(row[3]) +
    n(row[4]) +
    n(row[5]) + // male 3-6
    n(row[14]) +
    n(row[15]) +
    n(row[16]) +
    n(row[17]); // female 27-30 (indexes offset below)

  // Seniors (65+): Male 020-025, Female 044-049
  const seniors =
    n(row[12]) +
    n(row[13]) + // male 20-21
    n(row[8]) +
    n(row[9]) +
    n(row[10]) +
    n(row[11]) + // male 22-25 (indexes adjusted)
    n(row[20]) +
    n(row[21]) +
    n(row[22]) +
    n(row[23]) +
    n(row[24]) +
    n(row[25]); // female 44-49

  const children = kids;
  const adults = Math.max(0, total - (children + seniors));
  const medianIncome = n(row[26]); // B19013_001E at the end

  return {
    name: NAME,
    population: total,
    medianIncome,
    age: { children, adults, seniors },
  };
}

// IMPORTANT: We request variables in a specific order so indexes above match
const VARS = [
  "NAME",
  "B01001_001E", // total population

  // Male 003-006 (under 5, 5-9, 10-14, 15-17)
  "B01001_003E",
  "B01001_004E",
  "B01001_005E",
  "B01001_006E",

  // Male 020-025 (65-66, 67-69, 70-74, 75-79, 80-84, 85+)
  "B01001_020E",
  "B01001_021E",
  "B01001_022E",
  "B01001_023E",
  "B01001_024E",
  "B01001_025E",

  // Female 027-030 (under 5, 5-9, 10-14, 15-17)
  "B01001_027E",
  "B01001_028E",
  "B01001_029E",
  "B01001_030E",

  // Female 044-049 (65-66, 67-69, 70-74, 75-79, 80-84, 85+)
  "B01001_044E",
  "B01001_045E",
  "B01001_046E",
  "B01001_047E",
  "B01001_048E",
  "B01001_049E",

  // Median household income
  "B19013_001E",
];

export async function fetchMetricsForState(
  stateFips: string
): Promise<Metrics> {
  const url = `${BASE}?get=${VARS.join(",")}&for=state:${stateFips}`;
  const res = await fetch(url);
  const json: CensusApiResponse = await res.json();
  return toMetrics(json[1]); // first data row
}

export async function fetchMetricsForCounty(
  stateFips: string,
  countyFips: string
): Promise<Metrics> {
  const url = `${BASE}?get=${VARS.join(",")}&for=county:${countyFips}&in=state:${stateFips}`;
  const res = await fetch(url);
  const json: CensusApiResponse = await res.json();
  return toMetrics(json[1]);
}
