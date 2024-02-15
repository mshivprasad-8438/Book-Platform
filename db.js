const mongoose = require('mongoose');

const connectdB=async ()=>{
    const url = "mongodb+srv://admin:Nani@cluster0.mfpau1l.mongodb.net/?retryWrites=true&w=majority";
    // const url ="mongodb+srv://admin:Nani@cluster0.mfpau1l.mongodb.net/"

    try{
        // console.log("before connect");
        await mongoose.connect(url);
        console.log(`Connect ${url}`);
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
    const dbConnection=mongoose.connection;
    dbConnection.collection('open',(_)=>{
        console.log((`Database Connected : ${url}`));
    });

    dbConnection.on('error',(err)=>{
        console.error(`connection error:${err}`);
    });
    return;
}

module.exports=connectdB;


// const mongoose = require('mongoose');
// const server = "127.0.0.1:27017";
// const database = "Mynotebook"
// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(`mongodb://${server}/${database}`);
//         console.log('mongoDB connected!!');
//     }
//     catch (err){
//         console.log("failed to connect mongoDB!!", err)
//     }
// }
// mongoose.set('strictQuery', true);
// module.exports = connectToMongo;