import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="p-3 my-3">
      <a href={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>
      <Card.Body>
        <a href={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={` ${product.numReviews} recenzija`}
              />
            </div>
            <Card.Text as="h3"> {product.price} KM </Card.Text>
          </Card.Text>
        </a>
      </Card.Body>
    </Card>
  );
};

export default Product;
