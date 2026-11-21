import { Link } from "react-router-dom";
import { useReviews } from "../../hooks/useReviews";
import { useUserStore } from "../../stores/useUserStore";
import { dateShort } from "../../lib/format";
import Rating from "../ui/Rating";
import ReviewForm from "./ReviewForm";
import Tag from "../ui/Tag";

const Reviews = ({ productId, onRatingChange }) => {
  const user = useUserStore((s) => s.user);
  const { reviews, loading, submit, remove } = useReviews(productId, onRatingChange);
  const mine = reviews.find((r) => r.user?._id === user?._id);

  return (
    <section aria-labelledby="reviews" className="mx-auto max-w-7xl px-4 sm:px-6 pt-20">
      <h2 id="reviews" className="text-5xl sm:text-7xl">Reviews</h2>
      <div className="mt-8 grid lg:grid-cols-[360px_1fr] gap-8 items-start">
        <Tag className="p-5">
          {user ? (
            <ReviewForm key={mine?._id ?? "new"} initial={mine} onSubmit={submit} onRemove={remove} />
          ) : (
            <p>
              <Link to="/login" className="font-bold underline underline-offset-4">Log in</Link> to leave a review.
            </p>
          )}
        </Tag>
        <div>
          {loading ? null : reviews.length === 0 ? (
            <p className="text-lg">No reviews yet. Be the first.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li key={r._id}>
                  <Tag className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <Rating value={r.rating} />
                      <span className="font-label text-xs text-muted">{dateShort(r.createdAt)}</span>
                    </div>
                    {r.comment && <p className="mt-2">{r.comment}</p>}
                    <p className="mt-2 font-label text-xs font-semibold uppercase">{r.user?.name ?? "Shopper"}</p>
                  </Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
