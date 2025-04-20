import { useState } from 'react';

export default function InstructionsInput() {
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instruction, setInstruction] = useState<string>('');

  function handleChange(value: string) {
    if (value.length === 1) {
      setInstruction(instruction + '1. ');
    } else {
      setInstruction(value);
    }
  }

  function handleKeyDown(pressedKey: string) {
    if (pressedKey === 'Enter') {
      setInstructions(current => [...current, instruction]);
      setInstruction('');
    }
  }

  return (
    <div>
      <textarea
        onChange={e => handleChange(e.target.value)}
        onKeyDown={e => handleKeyDown(e.key)}
        value={instruction}
        className="text-black"></textarea>
    </div>
  );
}
