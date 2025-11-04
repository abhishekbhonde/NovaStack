
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ||"your_jwt_secret";
const expiresIn = process.env.JWT_EXPIRES_IN ||"1h";

export const signToken = (payload:object)=>{
    //@ts-ignore
    return jwt.sign(payload, secret, {expiresIn})
}

export const verifyToken = (token:string)=>[
     jwt.verify(token, secret) as object
]