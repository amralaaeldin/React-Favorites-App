import { useState, useEffect } from "react";
import { Card, Form, Input, Spin, Button, Typography, message } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

const UpdateFavorite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItem = async () => {
      setItem({
        id: 2,
        title: "Item 2",
        description: "Description for Item 2",
        image: "https://via.placeholder.com/200?text=Item+2",
        year: 2022,
      });
      return {
        id: 2,
        title: "Item 2",
        description: "Description for Item 2",
        image: "https://via.placeholder.com/200?text=Item+2",
        year: 2022,
      };
      setLoading(true);
      try {
        const response = await axios.get(`https://api.example.com/items/${id}`); // Replace with actual API endpoint
        setItem(response.data);
      } catch (error) {
        message.error("Failed to fetch item data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      console.log(id);
      fetchItem();
      console.log(item);
    }
  }, [id]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await axios.put(`https://api.example.com/items/${id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Use actual auth token mechanism
        },
      });
      message.success("Item updated successfully.");
      navigate("/favorites");
    } catch (error) {
      message.error("Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!item) {
    return <div>Item not found.</div>;
  }

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Update Favorite</h2>
      <Card
        hoverable
        cover={
          <img
            alt={item.title}
            src={item.image}
            style={{ height: "200px", objectFit: "cover" }}
          />
        }
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.2)", width: "70%", marginBottom: "20px" }}
      >
        <Card.Meta
          title={item.title}
          description={
            <>
              <Text type="secondary">{item.year}</Text>
            </>
          }
        />
      </Card>
      <Form initialValues={item} onFinish={handleSubmit} layout="vertical" style={{ width: "100%" }}>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateFavorite;
