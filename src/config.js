const config = {
  api: {
    baseUrl: import.meta.env.VITE_BASE_URL,
  },
};
console.log('ENV VAR:', import.meta.env.VITE_BASE_URL);
export default config;
