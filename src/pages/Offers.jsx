import React, { useEffect, useState } from 'react'
import { collapseToast, toast } from 'react-toastify';
import {collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import {db} from "../firebase"
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);


  useEffect(() => {
    async function fetchListings(){
      try {
        const listingRef = collection(db, "listings")
        const q = query(
          listingRef, 
          where("offer", "==", true), 
          orderBy("timestamp", "desc"), 
          limit(8)
        );
        const querySnap = await getDocs(q)
        const lastVisibe = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisibe);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        });
        setListings(listings);
        setLoading(false);

      } catch (error) {
        toast.error("Couldn't fetch listing!")
      }
    } 
    fetchListings();
  }, [])

  async function onFetchMoreListings(){
    try {
      const listingRef = collection(db, "listings")
      const q = query(
        listingRef, 
        where("offer", "==", true), 
        orderBy("timestamp", "desc"), 
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q)
      const lastVisibe = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisibe);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);

    } catch (error) {
      toast.error("Couldn't fetch listing!")
    }
  }
  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Offers</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <div>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {listings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className='flex justify-center items-center'>
              <button
                className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 rounded mb-6 mt-6 hover:border-slate-600 transition duration-150 ease-in-out'
                onClick={onFetchMoreListings}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  )
}

export default Offers