const app = require("./server");

const connection = require("./db/connection");

connection();

app.listen(4000, () => {
  console.log("Server connected");
});
