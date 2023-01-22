const db = require("../models");
const Dictionary = db.dictionary;

// Create and Save a new dictionary
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a dictionary
    const dictionary = new Dictionary({
        reference_Lang: req.body.reference_lang,
        learning_Lang: req.body.learning_lang,
        learning_Word: req.body.learning_Word,
        learning_Word_Synonyms: req.body.learning_Word_Synonyms,
        reference_Word: req.body.reference_Word,
        reference_Word_Synonyms: req.body.reference_Word_Synonyms
    });

    // Save dictionary in the database
    dictionary
        .save(dictionary)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the dictionary."
            });
        });
};

// Retrieve all dictionarys from the database.
exports.findAll = (req, res) => {
    const learning_Word = req.query.learning_Word;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    dictionary.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving dictionarys."
            });
        });
};

// Find a single dictionary with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    dictionary.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found dictionary with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving dictionary with id=" + id });
        });
};

// Update a dictionary by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    dictionary.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update dictionary with id=${id}. Maybe dictionary was not found!`
                });
            } else res.send({ message: "dictionary was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating dictionary with id=" + id
            });
        });
};

// Delete a dictionary with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    dictionary.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete dictionary with id=${id}. Maybe dictionary was not found!`
                });
            } else {
                res.send({
                    message: "dictionary was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete dictionary with id=" + id
            });
        });
};

// Delete all dictionarys from the database.
exports.deleteAll = (req, res) => {
    dictionary.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} dictionarys were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all dictionarys."
            });
        });
};

// Find all published dictionarys
exports.findAllPublished = (req, res) => {
    dictionary.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving dictionarys."
            });
        });
};