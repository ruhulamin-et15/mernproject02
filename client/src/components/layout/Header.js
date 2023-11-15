import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

function Header() {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const { id } = useParams();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar fixed-top">
          <Container fluid>
            <Navbar className="navbar-brand">
              <Link to="/" className=" text-decoration-none text-black">
                DARAZ BD
              </Link>
            </Navbar>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              className="w-50"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Nav.Link>
                    <Link className="text-decoration-none text-black" to="/">
                      DARAZ BD
                    </Link>
                  </Nav.Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item active">
                    <NavLink to="/" className="nav-link" aria-current="page">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavDropdown
                      className="dropdown mb-1"
                      title="Categories"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item>
                        {categories?.map((c) => (
                          <li>
                            <Link
                              className="dropdown-item"
                              to={`/category/${c._id}`}
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </NavDropdown.Item>
                    </NavDropdown>
                  </li>

                  {!auth.user ? (
                    <>
                      <li className="nav-item">
                        <NavLink
                          to="/register"
                          className="nav-link"
                          aria-current="page"
                        >
                          Register
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          to="/login"
                          className="nav-link"
                          aria-current="page"
                        >
                          Login
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      {auth?.user?.role === 1 ? (
                        <>
                          <NavDropdown
                            className="dropdown mb-1"
                            title="Admin"
                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                          >
                            <NavDropdown.Item>
                              <Link
                                className="text-decoration-none text-black"
                                to={`/admin`}
                              >
                                Admin Dashboard
                              </Link>
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item>
                              <Link
                                onClick={handleLogout}
                                className="text-decoration-none text-black"
                                to="/login"
                              >
                                Logout
                              </Link>
                            </NavDropdown.Item>
                          </NavDropdown>
                        </>
                      ) : (
                        <>
                          <NavDropdown
                            className="dropdown mb-1"
                            title="User"
                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                          >
                            <NavDropdown.Item>
                              <Link
                                className="text-decoration-none text-black"
                                to={`/user`}
                              >
                                User Dashboard
                              </Link>
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item>
                              <Link
                                onClick={handleLogout}
                                className="text-decoration-none text-black"
                                to="/login"
                              >
                                Logout
                              </Link>
                            </NavDropdown.Item>
                          </NavDropdown>
                        </>
                      )}
                    </>
                  )}

                  <li className="nav-item mt-2">
                    <Badge count={cart?.length} showZero>
                      <NavLink
                        to="/cart"
                        className="nav-link"
                        aria-current="page"
                      >
                        Cart
                      </NavLink>
                    </Badge>
                  </li>
                </Nav>
                <SearchInput />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
