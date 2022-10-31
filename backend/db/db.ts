import { connect } from 'mongoose';
let db;
const connectDB = async (func: any) => {
    try {
        await connect(`${process.env.MONGO_URI}`);
        console.log('Connection active');
        func();
    } catch (error: any) {
        console.log(error.message);

    }
}

export default connectDB;