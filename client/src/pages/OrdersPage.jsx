import { Link } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import { money, titleCase } from "../lib/format";
import Tag from "../components/ui/Tag";
import WovenLabel from "../components/ui/WovenLabel";
import Barcode from "../components/ui/Barcode";
import EmptyTag from "../components/ui/EmptyTag";
import Btn from "../components/ui/Btn";
import Spinner from "../components/ui/Spinner";

const OrdersPage = () => {
  const { orders, loading, error } = useOrders();

  if (loading) return <Spinner label="Loading orders" />;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h1 className="text-6xl sm:text-8xl">Orders</h1>
        {orders?.length > 0 && (
          <span className="font-label text-sm font-semibold num">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        )}
      </div>

      {error ? (
        <EmptyTag
          title="Could not load orders"
          action={<Btn onClick={() => window.location.reload()}>Try again</Btn>}
        >
          {error}
        </EmptyTag>
      ) : !orders || orders.length === 0 ? (
        <EmptyTag
          title="No orders yet"
          action={
            <Btn to="/shop" variant="sticker">
              Start shopping
            </Btn>
          }
        >
          You haven't placed any orders yet. Once you complete checkout, your
          order details and receipts will be stored here.
        </EmptyTag>
      ) : (
        <div className="mt-8 space-y-8">
          {orders.map((order) => {
            const date = new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return (
              <div key={order._id} className="tag-wrap">
                <article className="tag p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <WovenLabel>Order Confirmed</WovenLabel>
                        <span className="font-label text-xs text-muted">
                          {date}
                        </span>
                      </div>
                      <p className="font-label text-xs font-semibold text-muted mt-1 truncate">
                        ID: {order._id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-label text-xs uppercase text-muted">
                        Total Paid
                      </p>
                      <p className="font-display font-black text-3xl num">
                        {money(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  <ul className="divide-y divide-ink/15">
                    {order.products?.map((item, idx) => {
                      const prod = item.product || {};
                      const prodId = prod._id || item._id || idx;
                      return (
                        <li
                          key={prodId}
                          className="py-4 first:pt-0 last:pb-0 flex items-center gap-4"
                        >
                          {prod.image ? (
                            <img
                              src={prod.image}
                              alt={prod.name || "Product"}
                              className="h-16 w-16 sm:h-20 sm:w-20 object-contain bg-white rounded-sm shrink-0 border border-ink/20"
                            />
                          ) : (
                            <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white/60 rounded-sm shrink-0 flex items-center justify-center font-label text-xs">
                              Item
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            {prod._id ? (
                              <Link
                                to={`/product/${prod._id}`}
                                className="font-display font-black text-2xl uppercase hover:underline truncate block"
                              >
                                {titleCase(prod.name || "Item")}
                              </Link>
                            ) : (
                              <p className="font-display font-black text-2xl uppercase truncate">
                                {titleCase(prod.name || "Item")}
                              </p>
                            )}
                            <div className="mt-1 flex items-center gap-2 flex-wrap">
                              {item.size && (
                                <WovenLabel>Size {item.size}</WovenLabel>
                              )}
                              <span className="font-label text-xs text-muted num">
                                Qty: {item.quantity} × {money(item.price)}
                              </span>
                            </div>
                          </div>
                          <div className="text-right font-display font-black text-2xl num shrink-0">
                            {money((item.price || 0) * (item.quantity || 1))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="flex items-center justify-between border-t-2 border-ink pt-4 gap-4 flex-wrap">
                    <Barcode
                      value={order.stripeSessionId || order._id}
                      height={24}
                    />
                    <span className="font-label text-xs uppercase tracking-wider text-muted">
                      Official Receipt
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
