import { app } from './app.js'

const PORT = process.env.PORT || 1313

app.listen(PORT, () => {
  console.log(`🚀 HTTP Server is Running on http://localhost:${PORT}`);
});