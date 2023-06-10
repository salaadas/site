import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AdminService {
    validate({username, password}: LoginDto): string {
        if (username === process.env.ADMIN_NAME && password === process.env.ADMIN_KEY) {
            return JSON.stringify({username, password});
        } else {
            return '';
        }
    }

    verifyCookie(key: string): boolean {
        const admin: {username?: string, password?: string} = JSON.parse(key);
        if (admin?.username === process.env.ADMIN_NAME && admin?.password === process.env.ADMIN_KEY) {
            return true;
        } else {
            return false;
        }
    }
}
