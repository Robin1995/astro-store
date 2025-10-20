import { v2 as cloudinary } from "cloudinary";
// Configuration
cloudinary.config({
  cloud_name: import.meta.env.COUDINARY_CLOUD_NAME,
  api_key: import.meta.env.COUDINARY_API_KEY,
  api_secret: import.meta.env.COUDINARY_API_SECRET,
});
export class ImageUpload {
  static async uploadImage(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const imageType = file.type.split("/")[1];
    const response = await cloudinary.uploader.upload(
      `data:image/${imageType};base64,${base64Image}`,
      {
        folder: "astro-store",
      }
    );
    return response.secure_url;
  }

  static async deleteImage(image: string): Promise<boolean> {
    try {
      const imageName = image.split("/").pop(); // get the last part after '/'
      if (!imageName) {
        throw new Error("Invalid image URL");
      }
      const publicId = imageName.split(".")[0]; // remove file extension

      await cloudinary.uploader.destroy(publicId);
      return true
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
