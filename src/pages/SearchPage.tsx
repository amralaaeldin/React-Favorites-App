import { useState, useEffect, useRef } from "react";
import { Input, Typography, Spin, Pagination, message } from "antd";
import MovieList from "../components/MovieList";
import { Item } from "../types";
import axios from "axios";

const { Title } = Typography;
const { Search } = Input;

const SearchPage = () => {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.length < 3) return;

    setSearchQuery(value);
    setCurrentPage(1);
    setIsTyping(true);

    debounceTimeout.current = setTimeout(() => {
      fetchItems(value, 1);
    }, 500);
  };

  const fetchItems = async (query: string, page: number) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get("https://api.example.com/items", {
        params: { search: query, page },
      });
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      message.error("Failed to fetch items. Please try again later.");
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchItems(searchQuery, page);
  };

  useEffect(() => {
    fetchItems("", 1);
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
        <Title level={3}>Search Items</Title>
        <Search
          placeholder="Enter item name (at least 3 letters)"
          enterButton="Search"
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        />
      </div>
      {isTyping || loading ? (
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

export default SearchPage;
