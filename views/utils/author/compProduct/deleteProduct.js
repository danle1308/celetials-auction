'use client'


import { deleteProductById } from '@/views/services/author/AuthorServices';
import { message } from 'antd';

export const handleDeleteProduct = async(id) => {
        try {
          await deleteProductById(id);
          message.success('Xóa sản phẩm thành công');
        } catch (error) {
            console.log('lỗi xoá sản phẩm: ', error);
          message.error('Lỗi khi xóa sản phẩm');
        }
}
