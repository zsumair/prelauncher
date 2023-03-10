export default async function ImageUploader(file, preset) {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);
    let result = await fetch(
      "https://api.cloudinary.com/v1_1/syedzoheb/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    let resdata = await result.json();
    return resdata;
  } catch (error) {
    return error;
  }
}
