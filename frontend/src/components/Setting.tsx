import { actions } from "astro:actions";
import React, { useEffect, useState, useId } from "react";

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
    inputType === "checkbox" ? currentValue.toString() : ""
  );

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
    updateSetting();
  }, [handleChange]);
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
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
