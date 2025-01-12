import { actions } from "astro:actions";
import React, { useEffect, useState, useId, useRef } from "react";

interface SettingProps {
  name: string;
  settingName: string;
  inputType: "checkbox" | "select";
  currentValue: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  options?: string[];
  token: string;
}

export default function Setting({
  name,
  settingName,
  inputType,
  currentValue,
  setError,
  options,
  token,
}: SettingProps) {
  const [newSettingValue, setNewSettingValue] = useState<string>(
    currentValue.toString()
  );

  const hasRendered = useRef(false);

  const id = useId();

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
  }

  async function updateSetting() {
    if (newSettingValue === null || newSettingValue === "") {
      return;
    }

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
  
  useEffect(() => {
    console.log("triggered");
  }, [newSettingValue]);

  return (
    <div className="flex flex-row">
      <label htmlFor={id}>{name}</label>
      {inputType === "checkbox" ? (
        <input
          id={id}
          className="mx-2"
          type="checkbox"
          onChange={(e) => handleChange(e)}
          checked={newSettingValue === "true"}
        />
      ) : (
        <select
          className="bg-transparent border-[1px] mx-2"
          value={newSettingValue}
          id={id}
          onChange={(e) => setNewSettingValue(e.target.value)}
        >
          {options?.map((option, index) => (
            <option className="bg-black" key={index} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
