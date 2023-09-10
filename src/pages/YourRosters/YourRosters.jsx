import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

      // Update the UI by removing the deleted roster from the state
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
      <h2>Your Rosters</h2>
      <ul>
        {rosters.map((roster) => (
          <li key={roster._id}>
            <Link to={`/rosters/${roster._id}`}>{roster.name}</Link>
            <button onClick={() => handleDelete(roster._id)}>Delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourRostersPage;
