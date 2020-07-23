// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  console.log("api");
  app.post("/api/start", (req, res) => {
    console.log("/api/start");
    console.log(req.body);

    // Save the data to the database here
    db.Respondent.create({
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    })
      .then(() => {
        console.log("Good");
        res.redirect(307, "/api/questions");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/questions", (req, res) => {
    console.log("/api/questions");
    console.log(req.body);

    // Retrieve a list of questions from the QuestionDB here
    // db.Question.
    questions = {};
    // Then render the handlebar using the questions
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/finish", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/questions", (req, res) => {
    db.Question.findAll({
      include: [
        {
          model: db.Choice, // This will use the foreign key automatically to "join" the results
          as: "choices"
        }
      ]
    })
      .then(questions => {
        console.log("quessss==>>>", questions);
        res.send(questions);
        //res.render("index", questions);
      })
      .catch(err => {
        console.log("errrrrrr==>>>", err);
      });
  });

  /*app.get("/api/testt", async (req, res) => {
    try {
      const survey = await db.Survey.create({
        name: "survey1",
        description: "sdfsdf"
      });
      //console.log('survey===>>', survey.id)
      await db.Question.create({ text: "question1", surveyId: survey.id });
      await db.Question.create({ text: "question2", surveyId: survey.id });

      await db.Choice.create({ text: "choice1 for q1", questionId: 1 });
      await db.Choice.create({ text: "choice2 for q1", questionId: 1 });

      await db.Choice.create({ text: "choice3 for q2", questionId: 2 });
      await db.Choice.create({ text: "choice4 for q2", questionId: 2 });
    } catch (err) {
      console.log("errrr=>>>", err);
    }
  });*/
};
