const mongoose = require('mongoose');
const connectdB=async ()=>{
    const url = process.env.DB_CONNECT;
    
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
