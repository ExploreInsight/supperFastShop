import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export function useReviews(productId, onRatingChange) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get(`/reviews/${productId}`);
      setReviews(data.reviews);
      const count = data.reviews.length;
      const avg = count ? Math.round((data.reviews.reduce((a, r) => a + r.rating, 0) / count) * 10) / 10 : 0;
      onRatingChange?.({ ratingAverage: avg, ratingCount: count });
    } finally {
      setLoading(false);
    }
  }, [productId, onRatingChange]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (rating, comment) => {
    try {
      await axios.post(`/reviews/${productId}`, { rating, comment });
      toast.success("Review saved");
      await load();
      return true;
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not save review");
      return false;
    }
  };

  const remove = async () => {
    try {
      await axios.delete(`/reviews/${productId}`);
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not remove review");
    }
  };

  return { reviews, loading, submit, remove };
}
