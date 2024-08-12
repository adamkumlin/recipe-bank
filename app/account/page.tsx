import { useContext } from "react";
import { UserContext } from "../layout";

export default function Account() {
  
  const user = useContext(UserContext);
  return (
    <div>
        <h1>{user.email}</h1>
    </div>
  );
}
