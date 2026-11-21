import dotenv from "dotenv";
import createApp from "./app.js";
import { connectDB } from "./lib/db.js";
import { autoSeedIfEmpty } from "./lib/seedDemo.js";

const startServer = async () => {
  try {
    //loading envs 
    dotenv.config();

    //connecting the db
    await connectDB();

    // an empty shop gets the demo catalogue (AUTO_SEED=false to disable)
    await autoSeedIfEmpty();

    //create app
    const app = createApp();

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () =>
      console.log(`Server Running: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error in server:", error);
  }
};

startServer();
