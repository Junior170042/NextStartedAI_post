import mongoose from 'mongoose'

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('Mongoose is already connected')

        return;
    }

    try {

        await mongoose.connect(process.env.MONGODB_URI, {
        })

        isConnected = true

        console.log('mongoDB connection successful!')

    } catch (err) {
        console.log('Error: ' + err)
    }
}