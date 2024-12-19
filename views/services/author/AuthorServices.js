import axios from '../../axios';

export const getProfileByEmail = async (email) => {
  try {
    const response = await axios.get(`/api/profileauthor/${email}`);
    return response.data;
  }
  catch (error) {
    console.error('Failed to fetch profile data: ', error);
    return null;
  }
}

export const editProfileById = async (id, data) => {
  try {
    console.log('data gửi', data);
    const response = await axios.put(`/api/profileauthor/${id}`, data);
    console.log('data nhận', response.data);
    return response.data;
  }
  catch (error) {
    console.error('loi o edit profile author roi dan oi', error);
    return null;
  }
}

//======================================//

export const handleAddProduct = async (formData) => {
  try {
    const response = await axios.post('/api/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Lỗi khi tạo cuộc đấu giá:', error.response.data);
    } else {
      console.error('Lỗi:', error.message);
    }
    return null;
  }
};

export const getProductById = async (authorId) => {
  try {
    const response = await axios.get(`/api/products/author/${authorId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product data:', error);
    return [];
  }
};

export const editProductById = async (id, formData) => {
  try {
    const response = await axios.put(`/api/edit/${id}`, formData,);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi chỉnh sửa sản phẩm:', error);
    return null;
  }
};

export const deleteProductById = async (id) => {
  try {
    const response = await axios.delete(`/api/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('hết cứu, k xoá được ní ơi, hàm lỗi', error);
    return null;
  }
}

export const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile); 

  try {
    const response = await axios.post('/api/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.imageUrl) {
      return response.data.imageUrl; 
    } else {
      throw new Error('Không nhận được URL từ API');
    }
  } catch (error) {
    console.error('Lỗi khi upload ảnh:', error);
    throw new Error('Không thể upload ảnh lên Cloudinary');
  }
};