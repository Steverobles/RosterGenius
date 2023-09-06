import { checkToken } from "../../utilities/users-service";

export default function OrderHistoryPage() {
    
  async function handleCheckToken() {
     const expDate = await checkToken()
  } 
  
  return (

    <>
    <h1>Your Rosters Page</h1>
    <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}