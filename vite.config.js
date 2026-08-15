export default defineConfig(() => {
  return {
    define: {
      __APP_ENV__: process.env.VITE_API_KEYZ,
    },
  };
});