import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const UpdateTransaction = () => {
  const navigate = useNavigate();
  const { loading, user } = useContext(AuthContext);
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");

  const categories = {
    Income: ["Salary", "Business", "Investments", "Other"],
    Expense: ["Food", "Health", "Bills", "Entertainment", "Shopping", "Other"],
  };

  useEffect(() => {
    if (!id || !user) return;

    fetch(
      `https://personal-finance-management-two.vercel.app/transaction/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.result) {
          setData(resData.result);
          setType(resData.result.type || "Income");
          setCategory(resData.result.category || "");
        } else {
          toast.error("Failed to load transaction data");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  }, [id, user]);

  if (loading || !data) return <Loading />;

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      description: e.target.description.value,
      category,
      amount: Number(e.target.amount.value),
      type,
      date: e.target.date.value ? new Date(e.target.date.value) : new Date(),
    };

    const isChanged =
      form.description !== (data.description || "") ||
      form.category !== (data.category || "") ||
      form.amount !== (data.amount || 0) ||
      form.type !== (data.type || "Income") ||
      new Date(form.date).toDateString() !== new Date(data.date).toDateString();

    if (!isChanged) {
      toast("Nothing changed, previous data retained", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return; 
    }

    
    fetch(
      `https://personal-finance-management-two.vercel.app/transaction/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(form),
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          toast.success("Transaction updated successfully!", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
          navigate(-1);
        } else {
          toast.error("Failed to update transaction!");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-base-100 shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-1 text-yellow-500">
          Update Transaction
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Edit your transaction details
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* name */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              value={data.name || ""}
              placeholder="Name"
              className="input input-bordered w-full cursor-not-allowed"
              disabled
            />
          </div>

          {/* type */}
          <div>
            <label className="label font-semibold">Type</label>
            <select
              value={type}
              className="select select-bordered w-full"
              onChange={(e) => {
                setType(e.target.value);
                setCategory(""); // type change হলে category reset
              }}
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* category */}
          <div>
            <label className="label font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select category</option>
              {categories[type]?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* amount */}
          <div>
            <label className="label font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              defaultValue={data.amount || ""}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* description */}
          <div>
            <label className="label font-medium">Description (Optional)</label>
            <textarea
              defaultValue={data.description || ""}
              name="description"
              placeholder="Add notes about this transaction..."
              className="textarea textarea-bordered w-full h-24 resize-none"
            ></textarea>
          </div>

          {/* date */}
          <div>
            <label className="label font-medium">Date</label>
            <input
              type="date"
              name="date"
              defaultValue={
                data.date ? new Date(data.date).toISOString().split("T")[0] : ""
              }
              className="input input-bordered w-full"
            />
          </div>

          {/* buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="btn text-white bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white bg-yellow-500 hover:bg-yellow-600"
            >
              Update Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
