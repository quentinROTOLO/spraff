const express = require("express");
const cors = require("cors");
const app = express();
// set port, listen for requests
const PORT = process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Spraff application." });
});

require("./app/routes/dictionary.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use('/api/')

// management of the connection 
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);



exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: JsonWebTokenError.sign({ userId: user._id },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};