import { useState, useEffect, useRef } from "react";
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
  const [activeCat, setActiveCat] = useState('');
  const categoriesRef = useRef([]);

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




  return (
    <main className="CreateRosterPage">
      <aside>
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <Link to="/rosters" className="button btn-sm">Completed Rosters</Link>
        <UserLogOut user={user} setUser={setUser} /> 
      </aside>
      <PlayerList
        playersByTier={playersByTier}
        playerDetails={playerDetails.filter(player => player.category.name === activeCat)}
        addPlayerToRoster={addPlayerToRoster} // Pass the function to PlayerList
      />
      <SelectedPlayersList selectedPlayers={selectedPlayers}
      onRemovePlayer={handleRemovePlayer}
      />
    </main>
  );
}

