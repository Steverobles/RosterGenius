import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ('./RosterDetails.css')

function RosterDetails() {
  const { rosterId } = useParams();
  const [roster, setRoster] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRosterDetails() {
      try {
        const response = await fetch(`/api/rosters/${rosterId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch roster details');
        }
        const data = await response.json();
        console.log(data)
        setRoster(data);

        

        setSelectedPlayers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchRosterDetails();
  }, [rosterId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!roster) {
    return <div>Roster not found.</div>;
  }

  return (
    <div className='roster-details'>
            <Link to="/rosters">Back</Link> 

      <p> {roster.name}</p>
      <div className='roster-players'>
      <ul>
        {roster.selectedPlayers.map((player) => (
          <li key={player._id}>
            {player.name}, Tier: {player.tier}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default RosterDetails;
