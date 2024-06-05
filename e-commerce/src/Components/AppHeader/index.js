import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Drawer,
  Menu,
  Table,
  Typography,
  message,
  Form,
  Button,
  Input,
  Checkbox,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../API";

function AppHeader() {
  const navigate = useNavigate();
  const items = [
    {
      label: <HomeFilled />,
      key: "",
    },
    {
      label: "Men",
      key: "men",
      children: [
        {
          label: "Men's Shirts",
          key: "mens-shirts",
        },
        {
          label: "Men's Shoes",
          key: "mens-shoes",
        },
        {
          label: "Men's Watches",
          key: "mens-watches",
        },
      ],
    },
    {
      label: "Women",
      key: "women",
      children: [
        {
          label: "Women's Dresses",
          key: "womens-dresses",
        },
        {
          label: "Women's Shoes",
          key: "womens-shoes",
        },
        {
          label: "Women's Watches",
          key: "womens-watches",
        },
        {
          label: "Women's Bags",
          key: "womens-bags",
        },
        {
          label: "Women's Jewellery",
          key: "womens-jewellery",
        },
      ],
    },
    {
      label: "Fragrances",
      key: "fragrances",
    },
  ];
  return (
    <div className="header text-center bg-white shadow-lg w-screen  fixed z-10">
      <Menu
        className="sm:w-auto md:w-80 absolute left-0 bottom-0"
        items={items}
        mode="horizontal"
        onClick={(item) => navigate(`${item.key}`)}
      />
      <Typography.Title level={4}>E-commerce</Typography.Title>
      <AddToCart />
    </div>
  );
}

function AddToCart() {
  // const {cartCount}=React.useContext(Cartcontext)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const onFinish = (values) => {
    setCheckoutDrawerOpen(false);
    setCartDrawerOpen(false);
    console.log(values);
    message.success("Your Order has been placed successfully!!");
  };
  const onFinishFailed = (values) => {
    setCheckoutDrawerOpen(false);
    setCartDrawerOpen(false);
    console.log(values);
    message.error("Your Order could not be placed.");
  };

  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res);
    });
  }, []);

  const columns = [
    {
      id: "product",
      title: "Product",
      dataIndex: "title",
    },
    {
      id: "unit-price",
      title: "Unit Price",
      dataIndex: "price",
    },
    {
      id: "quantity",
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      id: "total",
      title: "total",
      dataIndex: "total",
    },
  ];
  return (
    <div className="absolute right-7 bottom-[1px]">
      <Badge
        count={cartItems.totalProducts}
        onClick={() => setCartDrawerOpen(true)}
        className="cursor-pointer"
      >
        <ShoppingCartOutlined className="text-3xl" />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        title="Your Cart"
      >
        <Table
          dataSource={cartItems.products}
          columns={columns}
          pagination={false}
          summary={(data) => {
            const total = data.reduce((prev, current) => {
              return prev + current.total;
            }, 0);
            return (
              <Typography.Text>Total: ${total.toFixed(2)}</Typography.Text>
            );
          }}
        />
        <Button
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => setCheckoutDrawerOpen(false)}
        title="Confirm Order"
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="enter your name....." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please ienter a valid email address!",
              },
            ]}
          >
            <Input placeholder="Enter your email...." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
            label="Address"
            name="your_address"
          >
            <Input placeholder="Enter your address..." />
          </Form.Item>
          <Checkbox defaultChecked disabled>
            Cash on Delivery
          </Checkbox>
          <Typography.Paragraph type="secondary">
            More methods coming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            {" "}
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default AppHeader;
