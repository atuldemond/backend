const { isUtf8 } = require("buffer");

const fs = require("fs");

//FILE CRAETION PROCESS FROM FILES SYSTEM

fs.writeFile("atul.txt", "this is my file created by me ", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File is Successfully created");
  }
});

//reading data from the file

// fs.readFile("atul.txt", "utf8", (err, data) => {
//   console.log("your Data is loading");
//   if (err) {
//     conaole.log(err);
//   } else {
//     console.log(data);
//   }
// });

// fs.appendFile("atul.txt", "hello atul you are doing great", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Data is appending sucessfuly to file");
//   }
// });

//Renaming File

// fs.rename("newfile.txt", "atul.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File RENAMED Successfully");
//   }
// });

// Delteing File

// fs.unlink("atul.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File is Deleted successfully");
//   }
// });

//creating folder

// fs.mkdir("components", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Folder is created  successfully");
//   }
// });

//reading folder files --- value 1 == file , value 2 == folder
// fs.readdir("components", (err, files) => {}) without file type

// fs.readdir("components", { withFileTypes: true }, (err, files) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(files);
//   }
// });

//removing folder recursively
// fs.rm("lolo", { recursive: true }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("done ");
//   }
// });
