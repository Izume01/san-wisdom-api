import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    region : process.env.AWS_REGION,
    endpoint : process.env.AWS_ENDPOINT_URL_S3, 
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID!, 
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY!
    }
});

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getSignedUrlS3Bucket = async(fileName : string , fileType : string) => {
    const command = new PutObjectCommand({
        Bucket : process.env.AWS_BUCKET_NAME!,
        Key : fileName,
        ContentType : fileType
    });

    const uploadUrl = await getSignedUrl(s3 , command , {
        expiresIn : 60 * 5,
    })

    const publicUrl = `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.AWS_BUCKET_NAME!}/${fileName}`;

    return { uploadUrl, publicUrl };
    
}