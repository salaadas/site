import { Injectable } from "@nestjs/common";
import { UploadApiResponse, UploadApiErrorResponse, v2 } from "cloudinary";
import { Duplex } from "stream";

const bufferToStream = (buffer): Duplex => {
    let tmp = new Duplex();
    tmp.push(buffer);
    tmp.push(null);
    return tmp;
}

@Injectable()
export class CloudinaryService {
    async uploadImage(
        file: Express.Multer.File
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        if (file.size > 10 * 1e6) {
            throw new Error('Please upload a file that is less than 10MB');
        }
        if (!file.mimetype.startsWith('image')) {
            throw new Error('File is not an image, returning hard');
        }
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result)
                }
            );
            bufferToStream(file.buffer).pipe(upload);
        })
    }
}
