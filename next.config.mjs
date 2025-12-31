/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para usar src/app como directorio de la aplicación
  // Esto es necesario para Next.js 13+ cuando usas src/
  // experimental: {
  //   appDir: true,  // Ya no es necesario en versiones recientes
  // },
  
  // Asegura que Next.js busque en src/app
  // Estas configuraciones deberían hacer que funcione:
  
  /* Opcional: Si necesitas más control */
  // webpack: (config, { isServer }) => {
  //   return config;
  // },
  
  // Para desarrollo
  reactStrictMode: true,
  
  // Si tienes problemas con hot reload
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;