import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    try {
      if (auth.currentUser.displayName !== name) {
        // update the display name in firebase Authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("profile details Updated!");
    } catch (error) {
      toast.error("coudn't  update profile details");
    }
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>

        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* name Input */}
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />
            {/* Email Input */}
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4  py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out "
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 font-semibold hover:text-red-700 cursor-pointer transition ease-in-out duration-200 ml-1"
                >
                  {changeDetail ? "Apply Changes" : "Edite"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition duration-200 ease-in-out"
              >
                Sign Out
              </p>
            </div>
          </form>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link 
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-100 rounded-full p-1 border-2"/>
              Sell Or Rent your Home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
