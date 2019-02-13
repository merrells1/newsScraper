var mongoose = require("mongoose");
var express = require("express");
var exphbs = require("express-handlebars"); 
const PORT = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI || "mongodb://localhost/newsScrape"
var app = express();
const apiRoutes = require("./routes/api.js");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.use("/api", apiRoutes);

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(mongo_uri);

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});