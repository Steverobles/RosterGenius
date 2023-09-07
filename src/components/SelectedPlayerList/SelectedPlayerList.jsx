import React from 'react';

export default function SelectedPlayersList({ selectedPlayers, onRemovePlayer }) {
  return (
    <div className="SelectedPlayersList">
      <h2>Your Roster</h2>
      <ul>
        {selectedPlayers.map((player) => (
          <li key={player._id}>
            {player.name}
            <button onClick={() => onRemovePlayer(player)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
