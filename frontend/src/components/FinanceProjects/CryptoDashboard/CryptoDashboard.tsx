import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Box,
  Paper,
  Stack,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShowChart,
} from '@mui/icons-material';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume_24h: number;
  image: string;
}

const CryptoDashboard: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      // Using CoinGecko's public API for demo purposes
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }

      const data = await response.json();
      setCryptoData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else {
      return formatCurrency(value);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading crypto data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={fetchCryptoData}>
            Retry
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  const totalMarketCap = cryptoData.reduce(
    (sum, coin) => sum + coin.market_cap,
    0
  );
  const averageChange =
    cryptoData.reduce(
      (sum, coin) => sum + coin.price_change_percentage_24h,
      0
    ) / cryptoData.length;

  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <ShowChart /> Crypto Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Real-time cryptocurrency market data and analytics
        </Typography>
      </Box>

      {/* Market Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Market Cap (Top 10)
                  </Typography>
                  <Typography variant="h6">
                    {formatLargeNumber(totalMarketCap)}
                  </Typography>
                </Box>
                <AttachMoney color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Average 24h Change
                  </Typography>
                  <Typography
                    variant="h6"
                    color={averageChange >= 0 ? 'success.main' : 'error.main'}
                  >
                    {averageChange.toFixed(2)}%
                  </Typography>
                </Box>
                {averageChange >= 0 ? (
                  <TrendingUp color="success" />
                ) : (
                  <TrendingDown color="error" />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Cryptocurrencies
                  </Typography>
                  <Typography variant="h6">
                    {cryptoData.length} tracked
                  </Typography>
                </Box>
                <ShowChart color="info" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Crypto List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Top Cryptocurrencies by Market Cap
        </Typography>
        <Grid container spacing={2}>
          {cryptoData.map(coin => (
            <Grid item xs={12} md={6} key={coin.id}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={coin.image} alt={coin.name} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </Typography>
                      <Typography variant="h5" color="primary">
                        {formatCurrency(coin.current_price)}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={`${coin.price_change_percentage_24h.toFixed(2)}%`}
                        color={
                          coin.price_change_percentage_24h >= 0
                            ? 'success'
                            : 'error'
                        }
                        icon={
                          coin.price_change_percentage_24h >= 0 ? (
                            <TrendingUp />
                          ) : (
                            <TrendingDown />
                          )
                        }
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        Market Cap: {formatLargeNumber(coin.market_cap)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        24h Volume: {formatLargeNumber(coin.volume_24h)}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Refresh Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="outlined" onClick={fetchCryptoData}>
          Refresh Data
        </Button>
      </Box>

      {/* Disclaimer */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Disclaimer:</strong> This is for educational purposes only.
          Cryptocurrency investments are highly volatile and risky. Always do
          your own research and consult with financial advisors.
        </Typography>
      </Alert>
    </div>
  );
};

export default CryptoDashboard;
