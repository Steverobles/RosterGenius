import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import ('./SelectedPlayerList.css')


export default function SelectedPlayersList({ user, setUser, selectedPlayers, onRemovePlayer }) {
    const navigate = useNavigate()
    const [rosterName, setRosterName] = useState('')



    const handleSubmitRoster = async () => {
        try {
          const userId = user ? user._id : null;
          
          // Extract selected player IDs from the selectedPlayers array
          const selectedPlayerIds = selectedPlayers.map((player) => player._id);
      
          const newRoster = {
            userId,
            selectedPlayers:selectedPlayerIds,
            name: rosterName, 
          };
      
          const response = await fetch('/api/rosters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRoster),
          });
      
          if (!response.ok) {
            throw new Error(`Error creating roster: ${response.statusText}`);
          }
      
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
