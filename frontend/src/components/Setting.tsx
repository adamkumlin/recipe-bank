import { useState, type FormEvent } from "react";

interface SettingProps {
  name: string;
  action: (json: string) => void;
  inputType: "checkbox" | "text";
}

export default function Setting({ name, action, inputType }: SettingProps) {

    const [newSettingValue, setNewSettingValue] = useState<string>("");


        async function handleSubmit(e: FormEvent<HTMLFormElement>) {
            e.preventDefault();
        
            if (newSettingValue === "" || (typeof(newSettingValue) === "string" && parseInt(newSettingValue) <= 0)) {
                return;
            }
        
            const json: string = JSON.stringify(newSettingValue);
        
            const data = await action(json);
            
          }
        


  return (
    <div className="flex flex-row">
      <span>{name}</span> 
      <form onSubmit={handleSubmit}>
      {inputType === "checkbox" ? <input type="checkbox" /> : <input type="text" onChange={(e) => setNewSettingValue(e.target.value)}/>}
      <button type="submit">Save</button>
      </form>
    </div>
  );
}
