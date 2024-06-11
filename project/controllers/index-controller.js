const { randomnumber } = require("../utils/random-number");

module.exports.indexController = (req, res) => {
  // req.send(req.randomNumber.toString());

  console.log(randomnumber());
  res.render("index");
};
