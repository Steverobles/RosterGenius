import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import ('./YourRosters.css')

function YourRostersPage() {
  const [rosters, setRosters] = useState([]);
  const [ setLoading] = useState(true);
  const [ setError] = useState(null);

  useEffect(() => {

    async function fetchRosters() {
      try {
        const data = await sendRequest('/api/rosters', 'GET'); 
        setRosters(data)
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchRosters();
  }, );



  const handleDelete = async (rosterId) => {
    try {
      await sendRequest(`/api/rosters/${rosterId}`, 'DELETE');
      setRosters((prevRosters) => prevRosters.filter((roster) => roster._id !== rosterId));
    } catch (err) {
      setError(err);
    }
  };
  



  return (
    <div className='your-roster'>
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
