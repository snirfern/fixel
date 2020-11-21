const { app, middleware, upload } = require("./src/loaders/loaders");
require("./src/routes/auth")(app, middleware, upload);

app.listen(3001, () => {
  console.log("\033[2J");
  console.log("HTTP:\n connection is on! port number : " + 3001);
  console.log(" //------>  Lets start Rolling <-----/// ");
});
