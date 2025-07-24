'use client';

import { Container, Typography, Box, Pagination, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import { usePokemonList } from '@/hooks/usePokemon';
import PokemonCard from '@/components/pokemon/PokemonCard';

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 9;
  const offset = (page - 1) * limit;
  
  const { data, isLoading, error } = usePokemonList(limit, offset);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error loading Pokémon data</Alert>
      </Container>
    );
  }

  const totalPages = data ? Math.ceil(data.count / limit) : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Pokémon App
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Explore the amazing world of Pokémon!
        </Typography>
      </Box>
      
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3,
          mb: 4
        }}
      >
        {data?.results.map((pokemon, index) => {
          // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/" -> 1)
          const pokemonId = pokemon.url.split('/').filter(Boolean).pop() || '';
          return (
            <PokemonCard key={pokemon.name} pokemonId={pokemonId} />
          );
        })}
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
}