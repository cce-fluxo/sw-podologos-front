/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com', // Permite carregar imagens do Cloudinary
        },
        {
          protocol: 'https',
          hostname: 'google.com', // Permite carregar imagens do Google
        },
        // Adicione outros domínios conforme necessário
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
  };

export default nextConfig;