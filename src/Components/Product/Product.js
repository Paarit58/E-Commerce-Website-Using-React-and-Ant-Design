import React, { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import { useParams } from "react-router-dom";
import {
  List,
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Select,
  Spin,
} from "antd";

const { Meta } = Card;

function Product() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("a2z");
  let { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      getProductsByCategory(categoryId).then((data) => setItems(data.products));
      setLoading(false);
    } else {
      setLoading(true);
      getAllProducts().then((data) => setItems(data.products));
      setLoading(false);
    }
  }, [categoryId]);

  const sortedItems = (sortOption) => {
    const sortArray = [...items];
    if (sortOption === "a2z") {
      sortArray.sort((a, b) => {
        return a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : a.title.toLowerCase() < b.title.toLowerCase()
          ? -1
          : 0;
      });
    } else if (sortOption === "z2a") {
      sortArray.sort((b, a) => {
        return a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : a.title.toLowerCase() < b.title.toLowerCase()
          ? -1
          : 0;
      });
    } else if (sortOption === "l2h") {
      sortArray.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      sortArray.sort((b, a) => a.price - b.price);
    }
    return sortArray;
  };
  return (
    <div className="px-7 mt-14">
      <div className="my-2">
        <Typography.Text>Sort by: </Typography.Text>
        <Select
          className="bg-red-200! "
          defaultValue="a2z"
          // defaultActiveFirstOption
          // className="w-fit"
          onChange={(value) => setSortOrder(value)}
          options={[
            {
              label: "Albhabetically A-Z",
              value: "a2z",
            },
            {
              label: "Albhabetically Z-A",
              value: "z2a",
            },
            {
              label: "Price low to high",
              value: "l2h",
            },
            {
              label: "Prrice high to low",
              value: "h2l",
            },
          ]}
        />
      </div>

      <Spin spinning={loading}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={sortedItems(sortOrder)}
          renderItem={(item) => (
            <List.Item>
              <Badge.Ribbon
                text={`${item.discountPercentage}% off`}
                color="pink"
              >
                <Card
                  // className="size-"
                  hoverable
                  size="small"
                  bordered={false}
                  cover={<Image alt={item.title} src={item.thumbnail} />}
                  title={item.title}
                  actions={[
                    <Rate value={item.rating} allowHalf disabled />,
                    <AddToCart product={item} />,
                  ]}
                >
                  <Meta
                    title={
                      <Typography.Paragraph>
                        Price : ${item.price}{" "}
                        <Typography.Text type="danger" delete>
                          {"$"}
                          {item.price +
                            (item.price * item.discountPercentage) / 100}
                        </Typography.Text>
                      </Typography.Paragraph>
                    }
                    description={
                      <Typography.Paragraph
                        ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                      >
                        {item.description}
                      </Typography.Paragraph>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
}

function AddToCart({ product }) {
  const [loading, setLoading] = useState(false);
  
  return (
    <>
      <Button
        type="link"
        loading={loading}
        onClick={() => {
          setLoading(true);
          addToCart(product.id).then((res) => {
            
            message.success(`${product.title} has been added to cart`);
            setLoading(false);
          });
        }}
      >
        Add to Cart
      </Button>
      ,
    </>
  );
}

export default Product;
