import { useState, useEffect } from "react";
import { Typography, Spin, Pagination, message } from "antd";
import MovieList from "../components/MovieList";
import { Item } from "../types";
import axios from "axios";

const { Title } = Typography;

const Favorites = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      title: "Item 1",
      description: "Description for Item 1",
      image: "https://via.placeholder.com/200?text=Item+1",
      year: 2023,
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description for Item 2",
      image: "https://via.placeholder.com/200?text=Item+2",
      year: 2022,
    },
  ]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchItems = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.example.com/items", {
        params: { search: page },
      });
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      message.error("Failed to fetch items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchItems(page);
  };

  useEffect(() => {
    fetchItems(1);
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Title level={3}>Favorites</Title>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : items.length > 0 ? (
        <>
          <MovieList items={items} />
          <Pagination
            current={currentPage}
            total={totalPages * 10} // Assuming 10 items per page
            pageSize={10}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Typography.Text>No items found</Typography.Text>
        </div>
      )}
    </div>
  );
};

export default Favorites;
