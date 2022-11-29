import { connect } from 'mongoose';
let db;
const connectDB = async (func: any) => {
    try {
        await connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@sociali.elqpmlp.mongodb.net/?retryWrites=true&w=majority`);
        console.log('Connection active');
        func();
    } catch (error: any) {
        console.log(error.message);

    }
}

export default connectDB;