import { useState } from "react";
import { Card, Col, Button, Typography, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import { Item } from "../types";
import { useLocation, useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

const MovieCard = ({ item }: { item: Item }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(
    location.pathname === "/favorites"
  );

  const getUserToken = () => {
    return localStorage.getItem("auth_token");
  };

  const handleFavorite = async () => {
    const userToken = getUserToken();
    if (!userToken) {
      message.error("You need to be logged in to favorite items.");
      return;
    }

    try {
      await axios.post(
        "https://api.example.com/favorites",
        {
          title: item.title,
          image: item.image,
          year: item.year,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setIsFavorite(true);
      message.success(`${item.title} has been added to your favorites.`);
    } catch (error) {
      message.error("Failed to add to favorites. Please try again.");
    }
  };

  const handleUpdate = () => {
    navigate(`/favorites/${item.id}`);
  };

  return (
    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        cover={
          <img
            alt={item.title}
            src={item.image}
            style={{ height: "200px", objectFit: "cover" }}
          />
        }
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
      >
        <Card.Meta
          title={item.title}
          description={
            <>
              <Text type="secondary">{item.year}</Text>
              <Paragraph
                ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
              >
                {item.description}
              </Paragraph>
            </>
          }
        />
        <Button
          type="link"
          icon={
            isFavorite ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={handleFavorite}
          style={{ marginTop: "10px" }}
        ></Button>

        {/* {location.pathname === "/favorites" && ( */}
          <Button
            type="link"
            onClick={handleUpdate}
            style={{ marginTop: "10px", color: "#1890ff" }}
          >
            Update
          </Button>
        {/* )} */}
      </Card>
    </Col>
  );
};

export default MovieCard;
