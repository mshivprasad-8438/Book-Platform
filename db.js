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
    
    return;
}

module.exports=connectdB;
