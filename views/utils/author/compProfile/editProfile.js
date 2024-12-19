'use client'

import { message } from 'antd';
import { editInforById } from '@/views/services/user/ProfileServices';

export const handleEditProfile = async (form, updateProfile, profile, setUserInfo) => {
  const inforId = localStorage.getItem('inforId');
  try {
    const values = await form.validateFields().catch(() => null);
    if (!values) {
      const validValues = {};
      const errors = form.getFieldsError();

      errors.forEach((error) => {
        if (!error.errors.length) {
          const fieldValue = form.getFieldValue(error.name[0]);
          if (fieldValue !== undefined && fieldValue !== null) {
            validValues[error.name[0]] = fieldValue;
          }
        }
      });

      // Nếu không có giá trị hợp lệ từ form, ta sẽ lấy các giá trị từ profile
      if (!validValues.fullName) {
        validValues.fullName = profile.fullname;
      } else {
        validValues.fullName = validValues.fullName;
      };

      if (!validValues.dateofbirth) {
        validValues.dateofbirth = profile.dateofbirth
      } else {
        validValues.dateofbirth = validValues.dateofbirth
      };

      if (!validValues.gender) {
        validValues.gender = profile.gender
      } else {
        validValues.gender = validValues.gender
      };

      if (!validValues.country) {
        validValues.country = profile.country
      } else {
        validValues.country = validValues.country
      };

      if (!validValues.walletAddress) {
        validValues.walletAddress = profile.walletAddress
      } else {
        validValues.walletAddress = validValues.walletAddress
      };
      const isWalletAddressChanged = validValues.walletAddress && validValues.walletAddress !== profile.walletAddress;

      // Cập nhật lại updatedProfile với giá trị từ validValues và profile
      const updatedProfile = {
        ...profile,
        fullname: validValues.fullName,
        dateofbirth: validValues.dateofbirth,
        gender: validValues.gender,
        country: validValues.country,
      };
      setUserInfo(validValues.fullName);
      if (!isWalletAddressChanged) {
        delete updatedProfile.walletAddress; 
      } else {
        updatedProfile.walletAddress = validValues.walletAddress;
      }
      const response = await editInforById(inforId, updatedProfile);
      if (response) {
        updateProfile(updatedProfile);
        message.success('Profile updated successfully!');
      } else {
        message.error('Failed to update profile!');
      }
    } else {
      // Nếu không có lỗi, tiếp tục sử dụng values từ form
      const validValues = {};
      const errors = form.getFieldsError();
      errors.forEach((error) => {
        if (!error.errors.length) {
          const fieldValue = form.getFieldValue(error.name[0]);
          if (fieldValue !== undefined && fieldValue !== null) {
            validValues[error.name[0]] = fieldValue;
          }
        }
      });

      if (!validValues.fullName) {
        validValues.fullName = profile.fullname;
      } else {
        validValues.fullName = validValues.fullName;
      };

      if (!validValues.dateofbirth) {
        validValues.dateofbirth = profile.dateofbirth
      } else {
        validValues.dateofbirth = validValues.dateofbirth
      };

      if (!validValues.gender) {
        validValues.gender = profile.gender
      } else {
        validValues.gender = validValues.gender
      };

      if (!validValues.country) {
        validValues.country = profile.country
      } else {
        validValues.country = validValues.country
      };

      if (!validValues.walletAddress) {
        validValues.walletAddress = profile.walletAddress
      } else {
        validValues.walletAddress = validValues.walletAddress
      };
      const isWalletAddressChanged = validValues.walletAddress && validValues.walletAddress !== profile.walletAddress;
      const updatedProfile = {
        ...profile,
        fullname: validValues.fullName,
        dateofbirth: validValues.dateofbirth,
        gender: validValues.gender,
        country: validValues.country,
      };
      setUserInfo(validValues.fullName);
      if (!isWalletAddressChanged) {
        delete updatedProfile.walletAddress; 
      } else {
        updatedProfile.walletAddress = values.walletAddress;
      }
      const response = await editInforById(inforId, updatedProfile);
      if (response) {
        updateProfile(updatedProfile);
        message.success('Profile updated successfully!');
      } else {
        message.error('Failed to update profile!');
      }
    }

  } catch (error) {
    console.error('Error updating profile:', error);
    message.error('Failed to update profile!');
  }
}
