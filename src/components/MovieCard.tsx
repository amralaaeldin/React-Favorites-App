import { useState } from "react";
import {
  Card,
  Col,
  Button,
  Typography,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import { Item } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const MovieCard = ({ item }: { item: Item }) => {
  const location = useLocation();

  const [thisItem, setThisItem] = useState(item);
  const [isFavorite, setIsFavorite] = useState(
    location.pathname.includes("/favorites")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(
    thisItem.description ?? ""
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await api.put(`/favorites/${item.id}`, { description: textAreaValue });
    setThisItem({ ...thisItem, description: textAreaValue });
    message.success("Item updated successfully.");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      try {
        await api.delete(`/favorites/${thisItem.id}`);
        setIsFavorite(false);
        message.success(
          `${thisItem.title} has been removed from your favorites.`
        );
      } catch (error) {
        message.error("Failed to remove from favorites. Please try again.");
      }
    } else {
      try {
        const response = await api.post("/favorites", {
          ...thisItem,
          description: thisItem.description ?? thisItem.type,
          year: +thisItem.year,
        });
        setThisItem({ ...thisItem, id: response.data.id });
        setIsFavorite(true);
        message.success(`${thisItem.title} has been added to your favorites.`);
      } catch (error) {
        message.error("Failed to add to favorites. Please try again.");
      }
    }
  };

  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        cover={
          <img
            alt={thisItem.title}
            src={thisItem.image}
            style={{ height: "200px", objectFit: "cover" }}
          />
        }
        style={{
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          paddingBottom: "20px",
        }}
      >
        <Card.Meta
          title={thisItem.title}
          description={
            <>
              <Text type="secondary">{thisItem.year}</Text>
              <Paragraph
                ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
              >
                {thisItem.description ?? thisItem.type}
              </Paragraph>
            </>
          }
        />
        <div
          className="button-group"
          style={{ position: "absolute", right: "8px", bottom: "8px" }}
        >
          <Button
            type="link"
            icon={
              isFavorite ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )
            }
            onClick={toggleFavorite}
            style={{ marginTop: "10px" }}
          ></Button>

          {location.pathname === "/favorites" && (
            <>
              <Button type="primary" onClick={showModal}>
                Update
              </Button>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                okText="Update"
                onCancel={handleCancel}
              >
                <p>{thisItem.title}</p>
                <p>{thisItem.year}</p>
                <TextArea
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                  rows={4}
                />
              </Modal>
            </>
          )}
        </div>
      </Card>
    </Col>
  );
};

export default MovieCard;
