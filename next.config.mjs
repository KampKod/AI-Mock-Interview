/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https', // Specify the protocol (http or https)
          hostname: 'images.unsplash.com', // Specify the hostname (like unsplash)
          pathname: '/**', // This allows all paths on the specified domain
        },
      ],
    },
  };
  
  export default nextConfig;
  