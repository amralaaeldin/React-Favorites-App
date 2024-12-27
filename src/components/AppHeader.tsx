import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const isAuthenticated = () => {
    return false;
  };

  const authDependentRoutes = isAuthenticated()
    ? [{ key: "2", label: <Link to="/favorites">Favorites</Link> }]
    : [
        { key: "3", label: <Link to="/signup">Sign Up</Link> },
        { key: "4", label: <Link to="/login">Log In</Link> },
      ];

  const menuItems = [
    { key: "1", label: <Link to="/">Search</Link> },
    ...authDependentRoutes,
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="logo"
          style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
        >
          MyApp
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      </Header>
    </Layout>
  );
};

export default AppHeader;
