// const jwt = require('jsonwebtoken');
// const JWT_PRIVATEKEY = "Nani@shiv0101";

// const fetchuser = (req,res,next) =>{
//     //Get the user from JWT authtoken and add id to req object
//     const token = req.cookies('authtoken');
//     if(!token){
//         return res.status(401).send({error : "Please authenticate using a valid token"});
//     }
//     try {
//         const data = jwt.verify(token,JWT_PRIVATEKEY,(error, data)=>{
//             if (Date.now() >= data.exp * 1000) {
//                 return res.status(401).send({ error: "Token has expired, please re-authenticate" });
//             }
            
//             if (error) {
//                 return res.status(401).send({ error: "Please authenticate using a valid token" });
//               }
//               req.user = data.user;
//               next();
//         })
        
//     } 
    
//     catch (error) {
//         return res.status(401).send({error : "Please authenticate using a valid token"});
//     }
// }

// module.exports = fetchuser;


const jwt = require('jsonwebtoken');
const JWT_PRIVATEKEY = "Nani@shiv0101";

const fetchuser = (req, res, next) => {
    const token = req.cookies['authtoken'];

    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_PRIVATEKEY);

        req.user = data.user;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired. Please re-authenticate.' });
        } else {
            return res.status(401).json({ error: 'Invalid token.' });
        }
    }
}



module.exports = fetchuser;
