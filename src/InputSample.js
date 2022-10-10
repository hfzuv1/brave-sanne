import React from "react";

export default function InputSample({
  maximumValue,
  setMaximumValue,
  presetMaxValues
}) {
  return (
    <div>
      최대 통솔력
      <input
        onChange={(e) => {
          setMaximumValue(e.target.value);
        }}
        value={maximumValue}
      />
      {presetMaxValues.map((x) => (
        <button key={x} onClick={() => setMaximumValue(x)}>
          {x}
        </button>
      ))}
    </div>
  );
}
