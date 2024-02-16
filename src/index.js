import "dotenv/config";

import app from "./app/app.js";

const port = process.env.PORT || 3001;

console.log(process.env);

app.listen(port, () => {
 console.log(
  `----------------- Server running on port: ${port} -----------------`
 );
});
