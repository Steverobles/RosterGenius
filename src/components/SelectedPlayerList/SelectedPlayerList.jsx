import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import sendRequest from '../../utilities/send-request';
import ('./SelectedPlayerList.css')


export default function SelectedPlayersList({ user, setUser, selectedPlayers, onRemovePlayer }) {
    const navigate = useNavigate()
    const [rosterName, setRosterName] = useState('')



    const handleSubmitRoster = async () => {
        try {
          const userId = user ? user._id : null;
          
          const selectedPlayerIds = selectedPlayers.map((player) => player._id);
      
          const newRoster = {
            userId,
            selectedPlayers:selectedPlayerIds,
            name: rosterName, 
          };
      
          const response = await sendRequest('/api/rosters', 'POST', newRoster );
      
      
          navigate('/rosters');
        } catch (error) {
          console.error('Error creating roster:', error);
        }
      };

  return (
    <div className="SelectedPlayersList">
              <h2>Wishlist</h2>
         <div>
        <input type="text" 
          placeholder="Enter Your Roster Name"
          value={rosterName}
          onChange={(t) => setRosterName(t.target.value)}
        />
      </div> 
      <ul>
        {selectedPlayers.map((player) => (
          <li key={player._id}>
            {player.name}
            <button onClick={() => onRemovePlayer(player)}>Remove</button>

          </li>
        ))}
      </ul>
      <div>
      <button onClick={handleSubmitRoster}>Submit Roster</button>
      </div>
    </div>
  );
}
