import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ('./YourRosters.css')

function YourRostersPage() {
  const [rosters, setRosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchRosters() {
      try {
        const response = await fetch('/api/rosters'); 
        if (!response.ok) {
          throw new Error('Failed to fetch rosters');
        }
        const data = await response.json();
        setRosters(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchRosters();
  }, []);

  const handleDelete = async (rosterId) => {
    try {
      const response = await fetch(`/api/rosters/${rosterId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete roster');
      }

      setRosters((prevRosters) => prevRosters.filter((roster) => roster._id !== rosterId));
    } catch (err) {
      setError(err);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div>
      <h2>Your Roster Wishlist</h2>
      {rosters.length === 0 ? (
        <p>No Rosters, click on Create Roster to make one</p>
      ) : (
        <ul>
          {rosters.map((roster) => (
            <li className='roster-list' key={roster._id}>
              <Link className='teams' to={`/rosters/${roster._id}`}>{roster.name}</Link>
              <button className='delete-btn' onClick={() => handleDelete(roster._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default YourRostersPage;
