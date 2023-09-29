import React, { useEffect, useState } from "react";
import ReactStars from 'react-stars';
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ThreeCircles } from "react-loader-spinner";
import Review from "./Review";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating:0,
    rated:0
  });
const [loading,setLoading]=useState(true);
  useEffect(() => {
    async function getData() {
        setLoading(true)
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      if (_data.exists()) {
        setData(_data.data());
        setLoading(false)
      }
    }
    getData();
  }, [id]);

  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
            {loading ? (
        <ThreeCircles height={25} color="white" />
      ) : (
        <>
      <img
        className="h-80 block md:sticky top-24" 
        src={data.image}
        alt="movie"
      />
      <div className="md:ml-4 ml-0 w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-400">
          Star <span className="text-xl">{data.year}</span>
        </h1>
        <ReactStars
          size={20}
          half={true}
          value={data.rating/data.rated}
          edit={false}
        />
        <p className="mt-3">
          {data.description}<Review id=
          {id} prevRating={data.rating} userrated={data.rated}/>
        </p>
      </div></>)}
    </div>
  );
};

export default Details;
