import 'dotenv/config';
import { app } from './app.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Api is listening on http://localhost:${PORT}`);
});