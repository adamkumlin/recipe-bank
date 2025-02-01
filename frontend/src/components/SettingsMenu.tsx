import { actions } from "astro:actions";
import Setting from "./Setting";
import { useEffect, useRef, useState } from "react";
import { type UserSettings } from "../lib/utils/types";

interface Props {
  token: string;
}
export default function SettingsMenu({ token }: Props) {
  const [error, setError] = useState("");
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  // const loginSectionRef = useRef(null);
  const displaySectionRef = useRef(null);
  const accessibilitySectionRef = useRef(null);

  function handleClick(ref: React.MutableRefObject<HTMLDivElement | null>) {
    if (!ref.current) {
      return;
    }
    ref.current.scroll()
    ref.current.animate([
      { backgroundColor: 'initial' },
      { backgroundColor: "#00308F" },
      { backgroundColor: 'initial' }
    ], {
      duration: 1000,
      iterations: 1
    });
  }

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
    return <h2>You need to be logged in to view this page.</h2>;
  } else if (!userSettings) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div className="flex flex-col w-1/2 mx-auto bg-gray-900 border-2 rounded-md">
        <div className="flex flex-row justify-center gap-2 text-purple-300 *:p-2">
          {/* <a onClick={() => handleClick(loginSectionRef)} href="#login">Login</a> */}
          <a onClick={() => handleClick(displaySectionRef)} href="#display">Display</a>
          <a onClick={() => handleClick(accessibilitySectionRef)} href="#accessiblity">Accessibility</a>
        </div>
        {error && <span className="text-red-500">{error}</span>}
        <div className="*:flex *:flex-col *:justify-evenly *:border-b">
          {/* <div ref={loginSectionRef} id="login" className={focusedSection === "login" ?  "bg-blue-500 transition-all" : ""}>
          </div> */}
          <div ref={displaySectionRef} id="display">
            <Setting
              name="Use dark theme"
              inputType="checkbox"
              settingName="useDarkTheme"
              currentValue={userSettings.useDarkTheme.toString()}
              setError={setError}
              token={token}
            />
            <Setting
              name="Language"
              inputType="select"
              settingName="displayLanguage"
              currentValue={userSettings.displayLanguage.toString()}
              options={["english", "swedish"]}
              setError={setError}
              token={token}
            />
            <Setting
              name="Always minimize navbar"
              inputType="checkbox"
              settingName="alwaysMinimizeNavbar"
              currentValue={userSettings.alwaysMinimizeNavbar.toString()}
              setError={setError}
              token={token}
            />
          </div>
          <div ref={accessibilitySectionRef} id="accessibility">
            <Setting
              name="Font size"
              inputType="select"
              settingName="fontSize"
              options={["0.5", "0.75", "1", "1.25", "1.5", "1.75", "2"]}
              currentValue={userSettings.fontSize.toString()}
              setError={setError}
              token={token}
            />
            <Setting
              name="Font"
              inputType="select"
              settingName="font"
              options={["Lilita One", "Arial", "Roboto", "Merriweather"]}
              currentValue={userSettings.font.toString()}
              setError={setError}
              token={token}
            />
          </div>
        </div>
      </div>
    );
  }
}
