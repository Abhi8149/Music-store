import mongoose from 'mongoose';

type ConnectObject={
    isConnected?:number;
}

const connection:ConnectObject={};

export async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log('Database is already connected');
        return;
    }
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI! || '')
        connection.isConnected=conn.connections[0].readyState;
        console.log('Database connected');

    } catch (error) {
        console.log('Error in connecting to database');
    }
}