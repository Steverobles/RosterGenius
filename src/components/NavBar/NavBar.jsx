// import { Link } from 'react-router-dom';
// import * as userService from '../../utilities/users-service';

// export default function NavBar({ user, setUser }) {
//   function handleLogOut() {
//     userService.logOut();
//     setUser(null);
//   }

//   return (
//     <nav className='navbar'>
//       <div className="title-left">
//         <h1>RosterGenius</h1>
//       </div>
//       <Link to="/rosters">Your Rosters</Link>
//       &nbsp; | &nbsp;
//       <Link to="/rosters/new">Create Roster</Link>
//       &nbsp;&nbsp;
//       <span>Welcome, {user.name}</span>
//       &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
//     </nav>
//   );
// }

// import { Link } from 'react-router-dom';
// import * as userService from '../../utilities/users-service';
// import './NavBar.css'; // Import your CSS file

// export default function NavBar({ user, setUser }) {
//   function handleLogOut() {
//     userService.logOut();
//     setUser(null);
//   }

//   return (
//     <nav className='navbar'>
//       <div className="title-left">
//         <h1>RosterGenius</h1>
//       </div>
//       <div className="nav-links">
//         <Link to="/rosters">Your Rosters</Link>
//         <span className="divider">|</span>
//         <Link to="/rosters/new">Create Roster</Link>
//       </div>
//       <div className="user-info">
//         <span>Welcome, {user.name}</span>
//         <Link to="" onClick={handleLogOut}>Log Out</Link>
//       </div>
//     </nav>
//   );
// }


import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css'; // Import your CSS file

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='navbar'>
      <div className="title-left">
        <h1>RosterGenius</h1>
      </div>
      <div className="nav-links">
        <Link to="/rosters">Your Rosters</Link>
        <span className="divider"></span>
        <Link to="/rosters/new">Create Roster</Link>
      </div>
      <div className="user-info">
        <div className="logout">
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </div>
        <div className="welcome">
          Welcome, {user.name}
        </div>
      </div>
    </nav>
  );
}
