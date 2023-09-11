import React from 'react';
import './PlayerList.css'

export default function PlayerList({ playerDetails, addPlayerToRoster }) {
  const handleAddToRoster = (player) => {
    addPlayerToRoster(player);
  };

  const playersByTier = playerDetails.reduce((acc, player) => {
    const { tier } = player;
    if (!acc[tier]) {
      acc[tier] = [];
    }
    acc[tier].push(player);
    return acc;
  }, {});

  // return (
  //   <div className="PlayerListDetails">
  //     {Object.keys(playersByTier).map((tier) => (
  //       <div key={tier}>
  //         <h2>Tier {tier}</h2>
  //         {playersByTier[tier].map((player) => (
  //           <div key={player._id}>
  //             <div className="name">{`${player.name}`}</div>
  //             <div>
  //               <button
  //                 className="btn-sm"
  //                 onClick={() => handleAddToRoster(player)}
  //               >
  //                 Select Player
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div className="PlayerListDetails">
      {Object.keys(playersByTier).map((tier) => (
        <div key={tier}>
          <h2>Tier {tier}</h2>
          {playersByTier[tier].map((player) => (
            <div key={player._id} className="player-container">
              <div className="name">{`${player.name}`}</div>
              <button
                className="btn-sm select-button"
                onClick={() => handleAddToRoster(player)}
              >
                Select Player
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  
}
