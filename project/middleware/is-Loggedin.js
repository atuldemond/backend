module.exports.isLoggedin = (req, res, next) => {
  console.log("middle ware is running");
  //   res.redirect("/users"); use this also
  // you can your set timeInterval here also
  //   res.randomnumber = math.random();

  next();
};
