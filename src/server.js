import app from './app.js';
import { connectDB } from './config/db.js';


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
   console.log("Server is running on Port",PORT)
  });
});
