import { actions } from "astro:actions";
import Setting from "./Setting";
import { useEffect, useState } from "react";
import { type UserSettings } from "../lib/utils/types";

interface SettingsMenuProps {
  token: string;
}
export default function SettingsMenu({ token }: SettingsMenuProps) {
  const [error, setError] = useState("");
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  useEffect(() => {
    async function getUserSettings() {
      if (!token) {
        setError("Error: Invalid token.");
        return;
      }

      const user = await actions.verifyUserJwt(token);
      if (!user) {
        setError("Error: Invalid user.");
        return;
      }

      const { data } = await actions.getUserSettings(user.data.id);
      setUserSettings(data);
    }
    getUserSettings();
  }, []);

  if (!token) {
    return <h1>You need to be logged in to view this page.</h1>;
  } else if (!userSettings) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="flex flex-col border-2 border-red-500 w-1/2 mx-auto">
        <div className="flex flex-row justify-center gap-2 text-purple-300 border-b-2">
          <a href="#login">Account/Login</a>
          <a href="#display">Display/Visualisation</a>
          <a href="#accessiblity">Accessibility</a>

        </div>
        {error && <span className="text-red-500">{error}</span>}
        <div className="*:flex *:flex-row *:justify-evenly">
          <div id="#login">
            <Setting
              name="Always remember password"
              inputType="checkbox"
              settingName="alwaysRememberPassword"
              currentValue={userSettings.alwaysRememberPassword.toString()}
              setError={setError}
              token={token}
            />
          </div>
        </div>
      </div>
    );
  }
}
