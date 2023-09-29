import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../App";
// import withReactContent from 'sweetalert2-react-content'; // Import for React integration
// const MySwal = withReactContent(Swal); // Create a custom Swal instance with React integration

const Addmovie = () => {
  const useAppstate=useContext(Appstate)
  const navigate=useNavigate();
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rated: 0,
    rating: 0,
  });

  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleimageChange = (e) => {
    setForm({ ...form, image: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setForm({ ...form, description: e.target.value });
  };
  const handleYearChange = (e) => {
    setForm({ ...form, year: e.target.value });
  };
  const addmovie = async () => {
    if (
      form.title.trim() === "" ||
      form.year.trim() === "" ||
      form.image.trim() === "" ||
      form.description.trim() === ""
    ) {
      swal.fire({
        title: "Error",
        text: "Please fill in all fields",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      return; // Don't proceed further if any field is empty
    }

    try {
      if(useAppstate.login){
      setLoading(true);
      await addDoc(moviesRef, form);
      swal.fire({
        title: "success",
        buttons: false,
        timer: 3000,
      });
      setForm({
        title: "",
        year: "",
        description: "",
        image: "",
      });
      setLoading(false);
    }
    else{
      navigate('/login')
    }
    } catch (error) {
      swal.fire({
        title: "error",
        buttons: false,
        timer: 3000,
      });
    }
  };
    const [loading, setLoading] = useState(false);

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            ADD Movie</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">

                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={handleTitleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Year
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={handleYearChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.image}
                    onChange={handleimageChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              {/* //copy */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.Description}
                    onChange={handleDescriptionChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={addmovie}
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  {loading ? <TailSpin height={50} /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
