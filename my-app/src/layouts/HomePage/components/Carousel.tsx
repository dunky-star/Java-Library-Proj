import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import { BookModel } from "./../../../models/BookModel";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
  const [books, setBook] = useState<BookModel[]>([]); // Use BookModel[] for type
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null); // Use string type for error message

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:9191/api/books";
      const url: string = `${baseUrl}?page=0&size=9`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      type TEmbedded = {
        books: BookModel[];
      };

      type TResponse = {
        _embedded: TEmbedded;
      };
      const responseJson: TResponse = await response.json();
      const responseData = responseJson._embedded.books;

      console.log(responseJson);

      const loadedBooks: BookModel[] = []; // Proper array declaration

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }
      setBook(loadedBooks);
      setIsLoading(false);
    };

    fetchBooks().catch((error: unknown) => {
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
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(0, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(3, 6).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(6, 9).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <ReturnBook book={books[7]} key={books[7].id} />
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <Link className="btn btn-outline-secondary btn-lg" to="/search">
          View More
        </Link>
      </div>
    </div>
  );
};
