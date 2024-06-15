module.exports.homeRoutes = async (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

module.exports.aboutRoutes = async (req, res) => {
  try {
    res.render("about");
  } catch (error) {
    console.error("Error rendering about page:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

module.exports.contactRoutes = async (req, res) => {
  try {
    res.render("contact");
  } catch (error) {
    console.error("Error rendering contact page:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

module.exports.servicesRoutes = async (req, res) => {
  try {
    res.render("services");
  } catch (error) {
    console.error("Error rendering services page:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};
