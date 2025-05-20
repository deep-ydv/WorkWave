
export const uploadImageToCloudinary = async (file) => {
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned_preset');       // 🔁 Replace with your actual preset
  formData.append('cloud_name', 'dx4c0g5ao');      // 🔁 Replace with your cloud name

  try {
    const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;   // ✅ Return only the URL
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return null;
  }
};