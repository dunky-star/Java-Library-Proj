import { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import bookImage from "./../../images/BooksImages/book-code-1000.png";
import { StarsReview } from "../utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null); // Specify that httpError can be a string or null

  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:9191/api/books/${bookId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      }; // Proper object declaration

      setBook(loadedBook);
      setIsLoading(false);
    };

    fetchBook().catch((error: unknown) => {
      setIsLoading(false);
      if (error instanceof Error) {
        setHttpError(error.message);
      } else {
        setHttpError(String(error));
      }
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt="book" />
            ) : (
              <img src={bookImage} width="226" height="349" alt="book" />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={6} size={32} /> {/* Rating component */}
            </div>
          </div>
          {/* Checkout and review component */}
          <CheckoutAndReviewBox book={book} mobile={false} />
        </div>
        <hr />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-item-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt="book" />
          ) : (
            <img src={bookImage} width="226" height="349" alt="book" />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={4} size={32} /> {/* Rating component */}
          </div>
        </div>
        {/* Checkout and review component */}
        <CheckoutAndReviewBox book={book} mobile={true} />
        <hr />
      </div>
    </div>
  );
};
