'use client';

import { Container, Typography, Button } from '@mui/material';
import { usePokemonList } from '@/hooks/usePokemon';

export default function Home() {
  const { data, isLoading, error } = usePokemonList(10);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading Pokémon</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Pokémon App
      </Typography>
      <Typography variant="h5" gutterBottom>
        Welcome to the Pokémon World!
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 4 }}>
        Check PokéDex
      </Button>
      
      <Typography variant="h6" gutterBottom>
        First 10 Pokémon:
      </Typography>
      {data?.results.map((pokemon) => (
        <Typography key={pokemon.name}>
          {pokemon.name}
        </Typography>
      ))}
    </Container>
  );
}