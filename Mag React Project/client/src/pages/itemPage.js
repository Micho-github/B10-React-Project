import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import ItemInfoCard from '../components/itemInfoCard';
import Footer from '../components/footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ItemPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/item/${itemId}`);
        setItem(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching item details:', err); // Log the specific error
        setError('Error fetching item details. Please check the console for more information.');
        setLoading(false);
      }
      
    };

    fetchItemDetails();
  }, [itemId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <ItemInfoCard item={item} />
      <Footer/>
    </div>
  );
}

export default ItemPage;
