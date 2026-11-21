import { useState } from "react";
import Rating from "../ui/Rating";
import Btn from "../ui/Btn";

const ReviewForm = ({ initial, onSubmit, onRemove }) => {
  const [rating, setRating] = useState(initial?.rating ?? 0);
  const [comment, setComment] = useState(initial?.comment ?? "");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!rating) return;
    setBusy(true);
    await onSubmit(rating, comment);
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <p className="font-label text-xs font-semibold uppercase tracking-wider">{initial ? "Your review" : "Rate it"}</p>
      <Rating value={rating} onChange={setRating} />
      <label htmlFor="review-comment" className="sr-only">Comment</label>
      <textarea id="review-comment" rows={3} maxLength={500} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How does it fit?" className="w-full bg-white/60 border-2 border-ink rounded-md px-3 py-2.5" />
      <div className="flex gap-2">
        <Btn type="submit" busy={busy} disabled={!rating}>{initial ? "Update" : "Post review"}</Btn>
        {initial && <Btn type="button" variant="line" onClick={onRemove}>Remove</Btn>}
      </div>
    </form>
  );
};

export default ReviewForm;
