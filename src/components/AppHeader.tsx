import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../services/auth";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  setInterval(async () => {
    if (
      !window.location.href.includes("/login") ||
      !window.location.href.includes("/signup")
    ) {
      const response = await refreshAccessToken();
      if (response && response == "logout") {
        logout();
      }
    }
  }, 5 * 60 * 1000); // every 5 minutes

  const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken");
  };

  const logout = (e: React.MouseEvent<HTMLAnchorElement> | null = null) => {
    e?.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(`/login`);
  };

  const authDependentRoutes = isAuthenticated()
    ? [
        { key: "2", label: <Link to="/favorites">Favorites</Link> },
        {
          key: "3",
          label: (
            <Link onClick={logout} to="/logout">
              Log Out
            </Link>
          ),
        },
      ]
    : [
        { key: "4", label: <Link to="/signup">Sign Up</Link> },
        { key: "5", label: <Link to="/login">Log In</Link> },
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
