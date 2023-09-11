import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import * as playersAPI from '../../utilities/players-api';
import './CreateRoster.css';
import { Link } from 'react-router-dom';
import CategoryList from "../../components/CategoryList/CategoryList";
import PlayerList from "../../components/PlayerList/PlayerList";
import SelectedPlayersList from "../../components/SelectedPlayerList/SelectedPlayerList";
import UserLogOut from "../../components/UserLogOut/UserLogOut";

export default function CreateRoster({ user, setUser }) {
  const [playerDetails, setMenuItems] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  // const [currentRoster, setCurrentRoster] = useState([])
  const [activeCat, setActiveCat] = useState('');
  // const [rosterName, setRosterName] = useState('')
  const categoriesRef = useRef([]);
  // const navigate = useNavigate()

  useEffect(function() {
    async function getItems() {
      try {
        const players = await playersAPI.getAll();
        categoriesRef.current = [...new Set(players.map(player => player.category.name))];
        setMenuItems(players);
        setActiveCat(categoriesRef.current[0]);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    }
    getItems();
  }, []);

  const addPlayerToRoster = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);

    const updatedPlayerDetails = playerDetails.filter((p) => p._id !== player._id);
    setMenuItems(updatedPlayerDetails);
  };

  const handleRemovePlayer = (player) => {
    const updatedSelectedPlayers = selectedPlayers.filter((p) => p._id !== player._id);
    setSelectedPlayers(updatedSelectedPlayers);
    const isPlayerInAvailableList = playerDetails.some((p) => p._id === player._id);
    if (!isPlayerInAvailableList) {
      setMenuItems([...playerDetails, player]);
    }
  };
  
  const organizePlayersByTier = (players) => {
    const playersByTier = {};
    players.forEach((player) => {
      const { tier } = player;
      if (!playersByTier[tier]) {
        playersByTier[tier] = [];
      }
      playersByTier[tier].push(player);
    });
    return playersByTier;
  };

  const playersByTier = organizePlayersByTier(playerDetails)

  
  // const handleSubmitRoster = async () => {
  //   try {
  //     const userId = user ? user._id : null;
      
  //     // Extract selected player IDs from the selectedPlayers array
  //     const selectedPlayerIds = selectedPlayers.map((player) => player._id);
  
  //     const newRoster = {
  //       userId,
  //       selectedPlayers:selectedPlayerIds,
  //       name: rosterName, 
  //     };
  
  //     const response = await fetch('/api/rosters', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newRoster),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Error creating roster: ${response.statusText}`);
  //     }
  
  //     navigate('/rosters');
  //   } catch (error) {
  //     console.error('Error creating roster:', error);
  //   }
  // };

  return (
    <main className="CreateRosterPage">
      <aside>
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        {/* <Link to="/rosters" className="button btn-sm">Completed Rosters</Link> */}
        <UserLogOut user={user} setUser={setUser} /> 
      </aside>
      <PlayerList
        playersByTier={playersByTier}
        playerDetails={playerDetails.filter(player => player.category.name === activeCat)}
        addPlayerToRoster={addPlayerToRoster} 
      />
      <SelectedPlayersList selectedPlayers={selectedPlayers}
      onRemovePlayer={handleRemovePlayer}
      />
       {/* <div>
        <input type="text" 
          placeholder="Enter Your Roster Name"
          value={rosterName}
          onChange={(t) => setRosterName(t.target.value)}
        />
      </div> */}
      {/* <button onClick={handleSubmitRoster}>Submit Roster</button> */}
    </main>
  );
}

