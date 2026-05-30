import "dotenv/config";
import app from "./app.js";

//import MCP server

// invoke MCP server below

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server successfully running on: http://localhost:${PORT}`);
});
