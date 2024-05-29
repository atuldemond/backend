const fs = require("fs");

fs.writeFile("atul.txt", "this is my file created by me ", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File is Successfully created");
  }
});
