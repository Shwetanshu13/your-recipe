import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
};

const conection : ConnectionObject = {};

const dbConnect = async () => {
    if(conection.isConnected){
        // console.log("Using existing connection");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || '', {});

        conection.isConnected = db.connections[0].readyState;

        // console.log("New connection created");
    } catch (error) {
        // console.log("Error connecting databse ", error);

        process.exit(1);
    }
}

export default dbConnect;

