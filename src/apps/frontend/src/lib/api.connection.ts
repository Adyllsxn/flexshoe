import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper para obter URL completa da imagem
export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '/images/placeholder.svg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) return `${API_URL}${path}`;
  return path;
};

// Interceptor para log de requisições (desenvolvimento)
if (process.env.NODE_ENV === "development") {
  api.interceptors.request.use((config) => {
    const method = config.method?.toUpperCase() || 'UNKNOWN';
    const url = config.url || '';
    // Log apenas se não for erro de rede
    console.log(`🚀 [${method}] ${url}`);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      const method = response.config.method?.toUpperCase() || 'UNKNOWN';
      const url = response.config.url || '';
      const status = response.status;
      console.log(`✅ [${method}] ${url} - ${status}`);
      return response;
    },
    (error) => {
      // Suprimir erro de rede (Network Error) quando API está offline
      if (error.message === 'Network Error') {
        // Não logar nada no console
        return Promise.reject(error);
      }
      
      const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
      const url = error.config?.url || '';
      const status = error.response?.status || 'NO_RESPONSE';
      
      console.warn(`⚠️ [${method}] ${url} - ${status}`);
      
      if (status === 429) {
        console.warn('⏳ Muitas tentativas. Aguarde um momento.');
      }
      
      return Promise.reject(error);
    },
  );
}