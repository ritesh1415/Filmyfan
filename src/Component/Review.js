import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviwRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

const Review = ({ id, prevRating, userrated }) => {
  // const navigate=useNavigate();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [data, setData] = useState([]);
const[newAdded,setnewAdded]=useState(0);
  const sendReview = async () => {
    if (rating === 0) {
      swal.fire({
        title: 'Please provide a rating.',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(reviwRef, {
        movieid: id,
        name: 'ritesh',
        rating: rating,
        thoughts: form,
        timestamp: new Date().getTime(),
      });

      const ref = doc(db, 'movies', id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userrated + 1,
      });

      setRating(0);
      setForm('');
      setnewAdded(newAdded+1);
      swal.fire({
        title: 'Review Sent',
        showConfirmButton: false,
        timer: 3000,
      });
      // navigate("/")

    } catch (error) {
      swal.fire({
        title: error.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setData([]);
      const quer = query(reviwRef, where('movieid', '==', id));
      const querySnapshot = await getDocs(quer);
      const reviewData = [];
      querySnapshot.forEach((doc) => {
        reviewData.push(doc.data());
      });
      setData(reviewData);
      setReviewLoading(false);
    }
    getData();
  }, [id,newAdded]);

  return (
    <div className='mt-2 py-2 border-t-2 border-green-50 w-full'>
      <ReactStars size={50} half={true} value={rating} onChange={setRating} />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder='Please share your review...'
        className='w-full p-2 outline-none bg-green-500'
      />
      <button onClick={sendReview} className='bg-blue-600 w-full flex justify-center p-2'>
        {loading ? <TailSpin height={20} color='white' /> : 'Share'}
      </button>
      {reviewLoading ? (
        <div className='mt-3 flex justify-center'>
          <ThreeDots height={20} color='white' />
        </div>
      ) : (
        <div>
          {data.map((e, i) => (
            <div className='p-2 w-full mt-2' key={i}>
              <div className='flex'>
                <p className='text-blue-500'>{e.name}</p>
                <p className='ml-2'>{new Date(e.timestamp).toLocaleString()}</p>
              </div>
              <p>{e.thoughts}</p>
              <ReactStars size={15} half={true} value={e.rating} edit={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
