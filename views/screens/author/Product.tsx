'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Layout,
  Menu,
  Upload,
  theme,
  MenuProps,
  DatePicker,
  message,
} from 'antd';
import {
  BarChartOutlined,
  ProductOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import NavbarSetting from '@/views/components/NavbarSetting';
import moment from 'moment';
import { handleAddNewProduct } from '@/views/utils/author/compProduct/addProduct';
import { handleEditProduct } from '@/views/utils/author/compProduct/editProduct';
import { handleDeleteProduct } from '@/views/utils/author/compProduct/deleteProduct';
import { fetchProductData, updateProductStatus } from '@/views/utils/author/compProduct/loadProduct';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  href?: string,
): MenuItem {
  return {
    key,
    icon,
    label: <a href={href}>{label}</a>,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', 'dashboard', <BarChartOutlined />, '/author/settings/DashboardAuthor'),
  getItem('Product', 'product', <ProductOutlined />, '/author/settings/ProductAuthor'),
  getItem('Profile', 'profile', <UserOutlined />, '/author/settings/ProfileAuthor'),
];

interface Product {
  startTime: number;
  endTime: number;
  id: any;
  productname: string;
  image: string;
  description: string;
  price: string;
  auctionTime: any;
  status: 'The auction has not started yet' | 'The auction is ongoing' | 'The auction is over';
}

export default function Product() {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  const [cancel, setCancel] = useState(1);

  // Mở modal Add Product
  const openAddProductModal = () => {
    setIsEditMode(false);
    form.resetFields();
    setOpenModal(true);
  };

  // Mở modal Edit Product với thông tin sản phẩm
  const openEditProductModal = (record: Product) => {
    setIsEditMode(true);
    setEditingProduct(record); // Lưu sản phẩm đang chỉnh sửa
    const auctionTimeMinutes = Math.round((record.endTime - record.startTime) / 60000);
    // Đặt các giá trị của sản phẩm vào form
    form.setFieldsValue({
      productname: record.name,
      description: record.description,
      price: record.price,
      auctionTime: auctionTimeMinutes,
      startTime: moment(record.startTime),
      status: record.status,
      image: [{ url: record.image, name: 'Current Image' }],
    });
    setOpenModal(true);
  };

  const handleSubmit = async (formData: any) => {
    handleInputChange();
    if (!handleInputChange()) {
      message.warning("Please fill all required fields.");
      return;
    } else {
      setCancel(2);
      setLoading(true);
      if (isEditMode) {
        await handleEditProduct(formData, editingProduct.id, editingProduct, setProducts);
      } else {
        await handleAddNewProduct(formData, setLoading, setProducts, setOpenModal);
      }
      await fetchProductData(setProducts );
      updateProductStatus(products, setProducts);
      setCancel(1);
      setLoading(false);
      setOpenModal(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeletingProductId(id);
    setConfirmDeleteVisible(true);
  };

  // Xác nhận xóa sản phẩm
  const confirmDeleteProduct = async () => {
    if (deletingProductId !== null) {
      await handleDeleteProduct(deletingProductId);
      await fetchProductData(setProducts ); // Lấy dữ liệu sản phẩm
      updateProductStatus(products, setProducts);
      setDeletingProductId(null);
      setConfirmDeleteVisible(false);
    }
  };

  const handleInputChange = () => {
    const values = form.getFieldsValue();
    const isFormValid = Object.values(values).every(
      (value) => value !== undefined && value !== ""
    );
    return isFormValid;
  };

  // useEffect gọi hai hàm chính
  useEffect(() => {
    const loadData = async () => {
      await fetchProductData(setProducts );
      updateProductStatus(products, setProducts);
    };

    loadData();
  }, []);

  //hàm xử lí khi nhấn vào tên sản phẩm để vào LiveAuction của author
  const handleNavigateToLiveAuction = (auctionId: number, status: string) => {
    if (status === "The auction is over") {
      message.warning(`The auction is over, you can't enter to view it`);
      return;
    }
    window.location.href = `/author/LiveAuction/${auctionId}`
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchTerm],
      onFilter: (value: any, record: Product) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      render: (name: string, record: Product) => (
        <span
          className='name-product'
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => handleNavigateToLiveAuction(record.id, record.status)}
        >
          {name}
        </span>
      ),
    },
    {
      title: 'GIF',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => (
        <img src={text} alt="Product" style={{ width: '50px', height: '50px' }} />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'description-table',
    },
    {
      title: 'Start Price',
      dataIndex: 'price',
      key: 'price',
      className: 'startPrice-table',
    },
    {
      title: 'Auction Time',
      dataIndex: 'auctionTime',
      key: 'auctionTime',
      className: 'auctionTime-table',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'status-table',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      className: 'startTime-table',
      key: 'startTime',
      render: (startTime: number) => (
        startTime ? moment(startTime).format('YYYY-MM-DD HH:mm:ss') : 'Không có dữ liệu'
      ),
    },
    {
      title: 'Actions',
      className: 'actions-table',
      key: 'actions',
      render: (text: string, record: Product) => (
        <div>
          <Button
            className='but-edit'
            icon={<EditOutlined />}
            onClick={() => openEditProductModal(record)}
            disabled={record.status === "The auction is ongoing" || record.status === "The auction is over"}
          >
            Edit
          </Button>
          <Button
            className='but-delete'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            disabled={record.status === "The auction is ongoing"}
            style={{ marginLeft: '8px' }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['product']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <NavbarSetting />
        <Content style={{ margin: '16px' }}>
          <div className='divTitle' style={{
            padding: 5,
            maxHeight: 60,
            background: colorBgContainer,
          }}>
            <h3 className='titFromDiv'>Products</h3>
          </div>
          <div className='divInfor' style={{ padding: 15, minHeight: 485, background: colorBgContainer }}>
            <Row justify="space-between">
              <div style={{ marginBottom: '16px' }}>
                <Button className='butUpload' type="text" onClick={() => openAddProductModal()}>Upload Auction</Button>
              </div>

              <div className='search' style={{ marginBottom: '16px', display: 'flex', justifyContent: 'right' }}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Row>
            <Table
              dataSource={products.filter(product =>
                product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
            <Modal
              title={isEditMode ? 'Edit Product' : 'Add Product'}
              visible={openModal}
              onCancel={() => setOpenModal(false)}
              footer={[
                <Button key="cancel" disabled={cancel == 2} onClick={() => setOpenModal(false)}>Cancel</Button>,
                <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
                  Submit
                </Button>,
              ]}
            >
              <Form form={form} id="product-form" layout="vertical" onFinish={handleSubmit}>
                <Form.Item className='titleForModal' name="productname" label="Product Name" rules={[{ required: true, message: 'Please input product name!' }]}>
                  <Input className='titleForModal' />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input description!' }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name="price" label="Start Price" rules={[{ required: true, message: 'Please input start price!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="GIF" name="image" rules={[{ required: true, message: 'Please select GIF!' }]} valuePropName="fileList" getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}>
                  <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
                    <Button className='but-upload' icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="auctionTime"
                  label="Auction Time"
                  rules={[{ required: true, message: 'Please input Auction Time!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="startTime"
                  label="Start Time"
                  rules={[
                    { required: true, message: 'Please select start time!' },
                    {
                      validator: (_, value) => {
                        if (!value || value.isAfter(moment())) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Start time must be in the future!'));
                      },
                    },
                  ]}
                >
                  <DatePicker showTime />
                </Form.Item>
              </Form>
            </Modal>

            <Modal
              title="Confirm Delete"
              visible={confirmDeleteVisible}
              onCancel={() => setConfirmDeleteVisible(false)}
              onOk={confirmDeleteProduct}
              okText="Yes"
              cancelText="No"
            >
              <p>Are you sure you want to delete this auction?</p>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

