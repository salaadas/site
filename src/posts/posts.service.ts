import { BadRequestException, Injectable } from "@nestjs/common";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class PostsService {
    constructor(private cloudinary: CloudinaryService) {}
    async uploadImageToCloudinary(file: Express.Multer.File) {
        return await this.cloudinary.uploadImage(file).catch(() => {
            throw new BadRequestException('Invalid file type');
        });
    }
}
