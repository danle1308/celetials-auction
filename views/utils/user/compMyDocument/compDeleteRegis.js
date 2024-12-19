'use client'

import { deleteRegisterAuction } from '@/views/services/user/ProfileServices';
import { message } from 'antd';


export const handleDeleteRegis = async(registrationId, setRegisteredAuctions) => {
    try {
        const response = await deleteRegisterAuction(registrationId);
        console.log('Response trả về sau khi gọi API: ', response);
        if (response) {
            if (response.errorCode == 0) {
                message.success('huỷ đăng kí thành công');
            } else {
                message.error('xoá sản phẩm thất bại');
            }
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa sản phẩm:', error);
      }
}