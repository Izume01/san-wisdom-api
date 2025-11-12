import { getSignedUrlS3Bucket } from "../utils/s3client";

export const uploadUrlServices = {
    async getUploadUrl(fileName: string, fileType: string) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
        
        if (!allowedTypes.includes(fileType)) {
            throw new Error("Invalid file type. Allowed types: JPEG, PNG, GIF, WEBP, MP4, WEBM");
        }

        // Generate unique filename to avoid collisions
        const timestamp = Date.now();
        const uniqueFileName = `${timestamp}-${fileName}`;

        // Get signed URL from S3
        const { uploadUrl, publicUrl } = await getSignedUrlS3Bucket(uniqueFileName, fileType);

        return {
            uploadUrl,
            publicUrl,
            fileName: uniqueFileName
        };
    }
};
