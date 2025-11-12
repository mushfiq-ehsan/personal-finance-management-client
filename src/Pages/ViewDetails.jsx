import { use, useEffect, useState } from "react";
import { BsCalendarDate, BsFillFolderFill, BsTag } from "react-icons/bs";
import { FaArrowLeft, FaDollarSign, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const ViewDetails = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const {user} = use(AuthContext)
  const {id} = useParams()

  useEffect(() => {
      fetch(`http://localhost:3000/transaction/${id}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
  })
  .then(res => res.json())
  .then(data => {
    setData(data.result)
    setLoading(false)
    
  })


  }, [id, user])

  if(loading){
    return <div>Loading...</div>
  }
  
  

  return (
    <div className="min-h-screen  flex  justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <div className="mb-4">
          <Link
            to="/my-transactions"
            className="flex items-center text-[#2E8B57] hover:underline font-medium w-fit"
          >
            <FaArrowLeft className="mr-2" /> Back to List
          </Link>
        </div>
        <div className="md:flex justify-between items-center border-b border-[#e0d7c8] pb-4 mb-6 ">
          <h1 className="text-2xl font-semibold text-gray-500 flex items-center gap-2">
            <span className="text-2xl">⬇</span> Transaction Details
          </h1>
          <p className="text-3xl font-bold text-red-600 pt-2">
            ${data.amount}.00
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* type */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 text-yellow-500 p-3 rounded-xl shadow-sm">
              <BsTag className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Type</p>
              <p className="font-semibold text-gray-800">{data.type}</p>
            </div>
          </div>

          {/* category */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-400 p-3 rounded-xl shadow-sm">
              <BsFillFolderFill className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Category</p>
              <p className="font-semibold text-gray-800">
                {data.category}
              </p>
            </div>
          </div>

          {/* date */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 text-yellow-500 p-3 rounded-xl shadow-sm">
              <BsCalendarDate className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Date</p>
              <p className="font-semibold text-gray-800">{data.date ? new Date(data.date).toISOString().split('T')[0] : ""}</p>
            </div>
          </div>

          {/* total */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-400 p-3 rounded-xl shadow-sm">
              <FaDollarSign className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Amount
              </p>
              <p className="font-semibold text-gray-800">
                ${data.amount}.00
              </p>
            </div>
          </div>
        </div>

        {/* description */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {data.description}
          </p>
        </div>

        <hr className="my-6 border-[#e8e3db]" />

        {/* buttons */}
        <div className="flex flex-wrap gap-4 justify-center">

          <Link
            to='/add-transaction'
            className="btn bg-yellow-600 hover:bg-yellow-700 text-white  px-6 rounded-md"
          >
            <FaPlus/>  Add Transaction
          </Link>
          <Link to={`/update-transaction/${data._id}`}
            className="btn bg-gray-500 hover:bg-gray-600 text-white px-6 rounded-md border-0"
          >
            Update Transaction
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
