import { actions } from "astro:actions";
import Setting from "./Setting";

  export default function SettingsMenu() {

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-evenly">
                <a href="#login">Account/Login</a>
            </div>
            
            <div>
                <div id="#login">
                    <Setting name="Always remember password" inputType="checkbox" action={actions.} currentValue={true}/>
                </div>
            </div>
        </div>
    );
  }
  