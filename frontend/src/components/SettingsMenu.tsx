import { actions } from "astro:actions";
import Setting from "./Setting";

  export default function SettingsMenu() {

    return (
        <div className="flex flex-col border-2 border-red-500">
            <div className="flex flex-row justify-evenly">
                <a href="#login">Account/Login</a>
            </div>
            
            <div className="*:flex *:flex-row *:justify-evenly">
                <div id="#login">
                    <Setting name="Always remember password" inputType="checkbox" action={actions.toggleAlwaysRememberPassword} currentValue={true}/>
                </div>
            </div>
        </div>
    );
  }
  