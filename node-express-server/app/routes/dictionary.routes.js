module.exports = app => {
    const dictionary = require("../controllers/dictionary.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", dictionary.create);

    // Retrieve all dictionary
    router.get("/", dictionary.findAll);

    // Retrieve all published dictionary
    router.get("/published", dictionary.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", dictionary.findOne);

    // Update a Tutorial with id
    router.put("/:id", dictionary.update);

    // Delete a Tutorial with id
    router.delete("/:id", dictionary.delete);

    // Create a new Tutorial
    router.delete("/", dictionary.deleteAll);

    app.use("/api/dictionary", router);
};