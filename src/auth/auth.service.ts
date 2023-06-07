import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    validate({username, password}: LoginDto): Boolean {
        if (username === process.env.ADMIN_NAME && password === process.env.ADMIN_KEY) {
            return true;
        } else {
            return false;
        }
    }
}
