import { Row } from "antd";

import { Item } from "../types";
import MovieCard from "./MovieCard";

const MovieList = ({ items }: { items: Item[] }) => {
  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <MovieCard key={item.id} item={item} />
      ))}
    </Row>
  );
};

export default MovieList;