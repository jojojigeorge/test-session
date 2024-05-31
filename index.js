const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const app = express();

MONGO_URL = "mongodb+srv://username:username@cluster101.0ktl0i6.mongodb.net/?retryWrites=true&w=majority";
// app.use(session({
//     store: MongoStore.create({ mongoUrl: MONGO_URL })
//   }));
// const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://username:username@cluster101.0ktl0i6.mongodb.net/SessionStore?retryWrites=true&w=majority",
    }),
    cookie: {
      maxAge: 100 * 60 * 1000, // 100 minutes in milliseconds
    }
  })
);

app.get("/login", (req, res) => {
  // Set session data
  req.session.user = { id: 1, username: "example" };
  res.send("Logged in");
});
app.get("/profile", (req, res) => {
  // console.log('req',req)
    if (req.session.user) {
        res.send('Session data: '
            + JSON.stringify(req.session.user));
    } else {
        res.send('No session data found');
    }
  // Access session data
//   const user = req.session.user;
//   console.log('profile',req)
//   res.send(`Welcome ${user.username}`);
});
app.get("/logout", (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error logging out");
    } else {
      res.send("Logged out");
    }
  });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});