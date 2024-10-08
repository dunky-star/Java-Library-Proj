import { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import bookImage from "./../../images/BooksImages/book-code-1000.png";
import { StarsReview } from "../utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { ReviewModel } from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null); // Specify that httpError can be a string or null

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [totalStars, setTotalStars] = useState<number>(0);

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

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:9191/api/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.Reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });

        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    }; // End of FetchBookReview function

    fetchBookReviews().catch((error: unknown) => {
      setIsLoading(false);
      if (error instanceof Error) {
        setHttpError(error.message);
      } else {
        setHttpError(String(error));
      }
    });
  }, []);

  if (isLoading || isLoadingReview) {
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
              <StarsReview rating={totalStars} size={32} />{" "}
              {/* Rating component */}
            </div>
          </div>
          {/* Checkout and review component */}
          <CheckoutAndReviewBox book={book} mobile={false} />
        </div>
        <hr />
        {/* Latest Reviews component */}
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
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
            <StarsReview rating={totalStars} size={32} />{" "}
            {/* Rating component */}
          </div>
        </div>
        {/* Checkout and review component */}
        <CheckoutAndReviewBox book={book} mobile={true} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
