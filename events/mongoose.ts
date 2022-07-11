import { EventData, mainRoot } from 'brickord.js'
import mongoose from 'mongoose'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.join(mainRoot, '.env')})

export default {
    name: "ready",
    run: async () => {
        await mongoose.connect(
            process.env.MONGO_URI ?? '',
            { keepAlive: true }
        )
    }
} as EventData<'ready'>