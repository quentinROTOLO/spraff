module.exports = mongoose => {
    var schema = mongoose.Schema({
        reference_Lang: String,
        learning_Lang: Boolean,
        learning_Word: String,
        learning_Word_Synonyms: String = [],
        reference_Word: String,
        reference_Word_Synonyms: String = []
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Dictionary = mongoose.model("dictionary", schema);
    return Dictionary;
};