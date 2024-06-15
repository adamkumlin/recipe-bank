import { MongoClient } from "mongodb";

export default function Register() {
  
  async function register() {

    
    const client = new MongoClient(process.env.DB_CONNECTION_STRING as string);

  }
  
  return (
    <div>
        
    </div>
  );
}
