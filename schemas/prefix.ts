import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        immutable: true
    },
    prefix: String
})

export default mongoose.model('prefix', schema)