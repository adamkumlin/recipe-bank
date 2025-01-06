import { actions } from "astro:actions";
import React, { useEffect, useState, type FormEvent } from "react";

interface SettingProps {
  name: string;
  settingName: string;
  inputType: "checkbox" | "text";
  currentValue: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  token: string;
}

export default function Setting({
  name,
  settingName,
  inputType,
  currentValue,
  setError,
  token,
}: SettingProps) {
  const [newSettingValue, setNewSettingValue] = useState<string>(
    inputType === "checkbox" ? currentValue.toString() : ""
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked: boolean = e.target.checked;
    if (!token) {
      setError("Error: Invalid token.");
      return;
    }

    if (newSettingValue === "") {
      setError("Error: New value cannot be empty.");
      return;
    }
    setNewSettingValue(isChecked.toString());

    // if (currentSettingValue === newSettingValue) {
    //   setError("Error: New value must differ from the original value.");
    //   return;
    // }
  }

  useEffect(() => {
    async function updateSetting() {
      const user = await actions.verifyUserJwt(token);
      if (!user) {
        setError("Error: Invalid user.");
        return;
      }

      const json = {
        settingName: settingName,
        settingValue: newSettingValue,
        userId: user.data.id,
      };
      await actions.editUserSetting(json);
      setError("");
    }
    updateSetting()
  }, [handleChange]);

  return (
    <div className="flex flex-row">
      <span>{name}</span>
      {inputType === "checkbox" ? (
        <input
          type="checkbox"
          onChange={(e) => handleChange(e)}
          checked={newSettingValue === "true"}
        />
      ) : (
        <input
          type="text"
          onChange={(e) => setNewSettingValue(e.target.value)}
        />
      )}
    </div>
  );
}
