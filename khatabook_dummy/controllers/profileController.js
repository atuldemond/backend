module.exports.userprofile = async (req, res) => {
  try {
    // Simulating retrieving all posts logic
    res.render("profile");
  } catch (error) {
    console.error("Error retrieving all profile:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

module.exports.allposts = async (req, res) => {
  try {
    // Simulating retrieving all posts logic
    res.render("allposts");
  } catch (error) {
    console.error("Error retrieving all posts:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

module.exports.editpost = async (req, res) => {
  try {
    // Simulating edit post logic
    res.render("editpost");
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

module.exports.deletepost = async (req, res) => {
  try {
    // Simulating delete post logic
    res.render("deletepost");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

module.exports.addpost = async (req, res) => {
  try {
    // Simulating add post logic
    res.render("addpost");
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

module.exports.viewpost = async (req, res) => {
  try {
    // Simulating view post logic
    res.render("viewpost");
  } catch (error) {
    console.error("Error viewing post:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};
