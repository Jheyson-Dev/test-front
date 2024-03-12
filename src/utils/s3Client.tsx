import { S3 } from "@aws-sdk/client-s3";

const endpoint = "https://nyc3.digitaloceanspaces.com";

export const s3Client = new S3({
  endpoint,
  region: "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_SECRET_KEY,
  },
});
