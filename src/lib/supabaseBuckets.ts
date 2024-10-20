import { supabase } from "./supabase";

export const getBucketAndPath = (
  bucketName: string,
  folderName: string | undefined,
  fileName: string
) => {
  const folder = folderName || "default-folder";
  const uploadPath = `${folder}/${fileName}`;
  return { bucketName, uploadPath };
};

export const uploadFile = async (
  file: File,
  filePath: string,
  bucketName = ""
) => {
  try {
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`File upload failed: ${uploadError.message}`);
    }

    // Get the public URL of the uploaded file
    const { data: fileData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (!fileData || !fileData.publicUrl) {
      throw new Error("Failed to retrieve file URL");
    }

    return { url: fileData.publicUrl, error: null };
  } catch (error) {
    return { url: null, error: (error as Error).message };
  }
};

const extractFilePathFromUrl = (url: string, bucketName: string) => {
  const baseUrl = `https://aimnxrhpkewxcqmfjouu.supabase.co/storage/v1/object/public/${bucketName}/`;

  // Decode the URL to handle any encoded characters such as spaces (%20)
  const decodedUrl = decodeURIComponent(url);

  return decodedUrl.replace(baseUrl, "");
};

export const deleteFile = async (fileUrl: string, bucketName: string) => {
  const filePath = extractFilePathFromUrl(fileUrl, bucketName);
  const { error: removeError } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);

  if (removeError) {
    return { error: `File removal failed: ${removeError.message}` };
  }
  return { success: "File removed successfully!" };
};
