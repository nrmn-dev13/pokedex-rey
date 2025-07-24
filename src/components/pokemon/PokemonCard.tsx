'use client';

import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip, 
  Skeleton,
  Alert
} from '@mui/material';
import { usePokemon } from '@/hooks/usePokemon';

interface PokemonCardProps {
  pokemonId: string;
}

// Color mapping for Pokemon types
const typeColors: { [key: string]: string } = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export default function PokemonCard({ pokemonId }: PokemonCardProps) {
  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);

  if (isLoading) {
    return (
      <Card sx={{ height: 350, display: 'flex', flexDirection: 'column' }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent sx={{ flex: 1 }}>
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={24} />
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={60} height={24} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error || !pokemon) {
    return (
      <Card sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Failed to load Pokémon
        </Alert>
      </Card>
    );
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card 
      sx={{ 
        height: 480, // Keep the same height
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      {/* Image wrapper with controlled height */}
      <Box 
        sx={{ 
          height: 160, // Fixed height for image container
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          borderRadius: '4px 4px 0 0'
        }}
      >
        <CardMedia
          component="img"
          image={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
          alt={pokemon.name}
          sx={{ 
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>
      
      <CardContent sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        p: 3,
        minHeight: 0 // Ensures proper flex behavior
      }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: '1.25rem',
              lineHeight: 1.2
            }}
          >
            {capitalizeFirstLetter(pokemon.name)}
          </Typography>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              px: 1.5,
              py: 0.75,
              borderRadius: 1,
              fontWeight: 'bold',
              fontSize: '0.85rem',
              flexShrink: 0
            }}
          >
            #{pokemon.id.toString().padStart(3, '0')}
          </Typography>
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
          ID: {pokemon.id}
        </Typography>
        
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5 }}>
            Types:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {pokemon.types?.map((typeInfo) => (
              <Chip
                key={typeInfo.type.name}
                label={capitalizeFirstLetter(typeInfo.type.name)}
                size="medium"
                sx={{
                  backgroundColor: typeColors[typeInfo.type.name] || '#68A090',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  '&:hover': {
                    backgroundColor: typeColors[typeInfo.type.name] || '#68A090',
                    opacity: 0.8
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}