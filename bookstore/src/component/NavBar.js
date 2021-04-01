import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  Button,
  DropdownMenu,
  ListGroupItem,
  Container,
  ListGroup,
  Badge,
} from "reactstrap";
import { CartContext } from "../App";

const NavBar = () => {
  const { cartItems, increaseQuantity, decreaseQuantity } = useContext(
    CartContext
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <Container>
        <NavbarBrand href="/">Book Listing</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                CART
              </DropdownToggle>
              <DropdownMenu style={{ width: "350px" }} right>
                <ListGroup>
                  {cartItems.map((item) => (
                    <ListGroupItem>
                      Name: {item.name} <br></br>
                      Price: Rs.{item.price.replace("$", "") * 117}
                      <br></br>
                      Quantity:
                      <Badge
                        onClick={() => {
                          increaseQuantity(item.id);
                        }}
                        color="success"
                        pill
                      >
                        +
                      </Badge>
                      {item.quantity}
                      <Badge
                        onClick={() => {
                          decreaseQuantity(item.id);
                        }}
                        color="warning"
                        pill
                      >
                        -
                      </Badge>
                    </ListGroupItem>
                  ))}
                  <ListGroupItem>
                    Total: Rs.{" "}
                    {cartItems
                      .reduce((acc, item) => {
                        return (
                          acc +
                          item.price.replace("$", "") * 117 * item.quantity
                        );
                      }, 0)
                      .toFixed(2)}{" "}
                    <br></br>
                  </ListGroupItem>
                  <Button className="m-2" size="sm">
                    check out
                  </Button>
                </ListGroup>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
