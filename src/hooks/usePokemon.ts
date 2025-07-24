import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ['pokemon', 'list', limit, offset],
    queryFn: async (): Promise<PokemonListResponse> => {
      const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
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
    staleTime: 10 * 60 * 1000, // 10 minutes - Pokemon data rarely changes
    gcTime: 30 * 60 * 1000,    // 30 minutes
    retry: (failureCount: number, error: AxiosError) => {
      // Don't retry on 404 errors (Pokemon doesn't exist)
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ['pokemon', 'types'],
    queryFn: async () => {
      const response = await api.get('/type');
      return response.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour - Types rarely change
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};

// Batch fetch multiple Pokemon details
export const usePokemonBatch = (ids: (string | number)[]) => {
  return useQuery({
    queryKey: ['pokemon', 'batch', ids],
    queryFn: async (): Promise<Pokemon[]> => {
      const promises = ids.map(id => api.get(`/pokemon/${id}`));
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    },
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};