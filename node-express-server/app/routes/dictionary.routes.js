module.exports = app => {
    const dictionary = require("../controllers/dictionary.controller.js");
    const auth = require('../middleware/auth');
    var router = require("express").Router();

    // Create a new Dictionary
    router.post("/", auth, dictionary.create);

    // Retrieve all dictionary
    router.get("/", auth, dictionary.findAll);

    // Retrieve all published dictionary
    router.get("/published", auth, dictionary.findAllPublished);

    // Retrieve a single Dictionary with id
    router.get("/:id", auth, dictionary.findOne);

    // Update a Dictionary with id
    router.put("/:id", auth, dictionary.update);

    // Delete a Dictionary with id
    router.delete("/:id", auth, dictionary.delete);

    // Delete all Dictionary
    router.delete("/", auth, dictionary.deleteAll);

    app.use("/api/dictionary", router);
};