import { sign, verify } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "dfdfhchgh"

export default {
    verify: (token: string) => {
        try {
            const decoded = verify(token, JWT_SECRET)
            return decoded
        } catch (e) {
            console.log(e)
        }
        return false
    },
    encode: (obj: any) => {
        return sign(obj, JWT_SECRET)
    }
}