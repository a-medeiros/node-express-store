import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";
import { v4 as uuid } from "uuid";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function s3Upload(file: any, mime: string) {
    // 1️⃣ Generate unique key for S3
    const ext = mime.split("/")[1]; // jpg, png, etc.
    const key = `products/${uuid()}.${ext}`;

    // 2️⃣ Upload to S3
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: file.buffer,
        ContentType: mime,
    });
    await s3.send(command);

    // 3️⃣ Build image URL (public if your bucket or ACL allows it)
    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return imageUrl;
}
