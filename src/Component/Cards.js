import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const _data = await getDocs(moviesRef);
            const newData = [];
            _data.forEach((doc) => {
                newData.push({ ...doc.data(), id: doc.id });
            });
            setData((prev) => [...prev, ...newData]);
            setLoading(false);
        }
        getData();
    }, []);

    const handleRatingChange = (index, newRating) => {
        const updatedData = [...data];
        updatedData[index].rating = parseInt(newRating);
        setData(updatedData);
    };

    const generateRatingAsterisks = (rating, index) => {
        const maxRating = 10;
        const validRating = Number.isInteger(rating) && rating >= 0 ? rating : 0;
        const asterisks = '*'.repeat(validRating);
        const emptyStars = '*'.repeat(maxRating - validRating);

        return (
            <div className="cursor-pointer">
                <span style={{ color: 'gold' }} onClick={() => handleRatingChange(index, rating)}>
                    {asterisks}
                </span>
                <span style={{ color: 'lightgrey' }}>
                    {emptyStars}
                </span>
            </div>
        );
    };

    return (
        <div className='flex flex-wrap p-3 mt-2'>

            {loading ? <ThreeDots height={40} color="white" /> : data.map((e, i) => (
                    <Link to={`/details/${e.id}`}>
                <div key={i} className='card shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
                    <img className='h-72 m-0' src={e.image}  alt='movie' />
                    <h1><span className='text-blue-500'>Title: </span>{e.title}</h1>
                    <div className='flex items-center'>
                        <span className='text-blue-500'>Rating: </span>
                        {generateRatingAsterisks(e.rating, i)}
                    </div>
                    <h1><span className='text-blue-500'>Year: </span>{e.year}</h1>
                </div></Link>
            ))}
        </div>
    );
}

export default Cards;
