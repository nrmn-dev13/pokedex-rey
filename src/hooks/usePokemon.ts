import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ['pokemon', 'list', limit, offset],
    queryFn: async (): Promise<PokemonListResponse> => {
      const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
      return response.data;
    },
  });
};

export const usePokemon = (id: string | number) => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: async (): Promise<Pokemon> => {
      const response = await api.get(`/pokemon/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ['pokemon', 'types'],
    queryFn: async () => {
      const response = await api.get('/type');
      return response.data;
    },
  });
};