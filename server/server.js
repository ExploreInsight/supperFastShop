import dotenv from "dotenv";
import createApp from "./app.js";
import { connectDB } from "./lib/db.js";

const startServer = async () => {
  try {
    //loading envs 
    dotenv.config();

    //connecting the db
    await connectDB();

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
