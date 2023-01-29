const mongoose = require('mongoose');
const { Schema } = mongoose;

const instrumentSchema = New Schema({
    brand: {
        type: String,
        required: [true, "You must introduce your instrument's brand"]
    },
    model:  {
        type: String,
        required: [true, "You must introduce your instrument's model"]
    },
    year: Number,
    madeIn: String,
    description: String,
    owner:{
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
},
    {timestamps: true

});

const Instrument = mongoose.model('Instrument', instrumentSchema);
module.exports = Instrument;