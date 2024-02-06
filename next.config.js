/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ddragon.leagueoflegends.com", "avatars.githubusercontent.com"],
  },
  env: {
    ALL_CHEMPIONS: "All",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL1: "NEXTAUTH_URL",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "c91h7qoM9xbC6+2Hc9mI70na085g4dFITg9ekNBCoo8=",
    URL: "http://localhost:3000",
    GITHUB_ID: "e0f151003e75f28c94af",
    GITHUB_SECRET: "485810e428fde9c2c6b234c63a56f3079a03a117",

    MONGODB_URL:
      "mongodb+srv://slodkiarnold:KakXpjBuzyVV8H8DpEV11JT@cluster0.par4oai.mongodb.net/lol",
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
