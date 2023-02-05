module.exports = mongoose => {
    var schema = mongoose.Schema({
        id: Number,
        reference_Lang: String,
        learning_Lang: String,
        learning_Word: String,
        learning_Word_Synonyms: [],
        reference_Word: String,
        reference_Word_Synonyms: [],
        published: Boolean
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Dictionary = mongoose.model("dictionary", schema);
    return Dictionary;
};