const mongoose = require('mongoose');
const { Schema } = mongoose;

const instrumentSchema = new Schema({
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
    type: {
        type: String,
        
    },
    description: String,
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: 'https://www.nicepng.com/png/detail/2-24003_jpg-freeuse-stock-guitar-png-for-free-download.png'
    },
},
    {timestamps: true

});

const Instrument = mongoose.model('Instrument', instrumentSchema);
module.exports = Instrument;