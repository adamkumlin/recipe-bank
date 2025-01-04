import { actions } from "astro:actions";
import { useState, type FormEvent } from "react";
import Cookies from "js-cookie";

interface SettingProps {
  name: string;
  action: any;
  inputType: "checkbox" | "text";
  currentValue: "string" | boolean;
}

export default function Setting({
  name,
  action,
  inputType,
  currentValue,
}: SettingProps) {
  const [newSettingValue, setNewSettingValue] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      return;
    }

    const isDifferentValue = currentValue != newSettingValue ? true : false;
    if (!isDifferentValue && newSettingValue == "") {
      return;
    }

    const user = await actions.verifyUserJwt(token);
    if (!user) {
      return;
    }

    const newSettingValueJson: string = JSON.stringify(newSettingValue);
    const userIdJson: string = JSON.stringify(user.data.id);
    const json = {
      settingValue: newSettingValueJson,
      userId: userIdJson,
    };
    const data = await action(json);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked: boolean = e.target.checked;
    setNewSettingValue(isChecked.toString());
  }

  return (
    <div className="flex flex-row">
      <span>{name}</span>
      <form onSubmit={handleSubmit}>
        {inputType === "checkbox" ? (
          <input type="checkbox" onChange={(e) => handleChange(e)} />
        ) : (
          <input
            type="text"
            onChange={(e) => setNewSettingValue(e.target.value)}
          />
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
