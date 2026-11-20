/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/events", destination: "/#events", permanent: false },
      { source: "/projects", destination: "/#projects", permanent: false },
      { source: "/team", destination: "/#crew", permanent: false },
      { source: "/join", destination: "/#join", permanent: false },
      { source: "/learn", destination: "/courses", permanent: false },
    ];
  },
};

export default nextConfig;
