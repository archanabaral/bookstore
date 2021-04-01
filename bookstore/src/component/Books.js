import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Spinner,
  Row,
  Container,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { CartContext } from "../App";

const Book = ({ book }) => {
  const { addBookToCart } = useContext(CartContext);

  const { id, name, price, image, author, genre, published_date } = book;

  const [stock, setStock] = useState(book.stock);

  const handleAddToCart = () => {
    setStock(stock - 1);

    addBookToCart({ ...book, quantity: 1, stock });
  };

  let currentDate = new Date(published_date);

  let d = currentDate.getDate();
  let m = currentDate.getMonth() + 1;
  let y = currentDate.getFullYear();

  let date = (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;

  return (
    <div>
      <Card className="m-3" key={id}>
        <CardImg top width="100%" src={image} alt={name} />
        <CardBody>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Author:
            <Badge className="ml-2" color="secondary">
              {author}
            </Badge>
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Price:
            <Badge className="ml-2" color="success">
              Rs. {(price.replace("$", "") * 117).toFixed(2)}
            </Badge>
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            stock:
            <Badge className="ml-2" color="info">
              {stock}
            </Badge>
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Genre:
            {genre.split("|").map((genre) => (
              <Badge className="ml-2" color="warning">
                {genre}
              </Badge>
            ))}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            published_date:
            <Badge className="ml-2" color="info">
              {date}
            </Badge>
          </CardSubtitle>
          <CardText></CardText>
          {stock > 0 ? (
            <Button color="info" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          ) : (
            <Button color="info" disabled>
              Add To Cart
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const Books = (props) => {
  const [books, setBooks] = useState(null);
  const [genre, setGenre] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const genreList = [
    "Drama",
    "Comedy",
    "Action",
    "Crime",
    "Thriller",
    "Horror",
    "Sci-Fi",
    "Adventure",
    "Fantasy",
    "Musical",
  ];

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        if (genre) {
          data = data.filter((d) => d.genre.includes(genre));
        }
        setBooks(data);
      });
  }, [genre]);

  return books ? (
    <Container>
      <Dropdown className="ml-auto" isOpen={isOpen} size="sm" toggle={toggle}>
        <DropdownToggle
          caret
          style={{
            marginTop: "2rem",
            marginLeft: "30rem",
          }}
        >
          Genres
        </DropdownToggle>
        <DropdownMenu>
          {genreList.map((genre) => (
            <DropdownItem
              onClick={() => {
                setGenre(genre);
              }}
            >
              {genre}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Row md="4">
        {books.map((book) => (
          <Book book={book} />
        ))}
      </Row>
    </Container>
  ) : (
    <Spinner
      style={{
        width: "3rem",
        height: "3rem",
        marginTop: "10rem",
        marginLeft: "40rem",
      }}
    />
  );
};

export default Books;
