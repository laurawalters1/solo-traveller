const router = require("express").Router();
const { User } = require("../../../models");

// User signup route
router.post("/signup", async (req, res) => {
  console.log("signup route hit");
  console.log(req.body);
  try {
    const userData = await User.create(req.body);
    const user = userData.get({ plain: true });
    console.log("User Data: " + user);
    // @TODO - add session start functionality
    // res.json(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json(userData);
      //   res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User login route
router.post("/login", async (req, res) => {
  console.log("login route");
  console.log(req.body);
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json("User not found");
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    console.log(userData);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout function
// router.post("/logout", (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
