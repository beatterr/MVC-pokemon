import React from "react";
import { useState } from "react";
export default function InputAndSearch(props) {
  const [name, setName] = useState("abra");

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const placeHolder = "Search for pokemon";

  return (
    <>
      <input
        type="text"
        placeholder={placeHolder}
        onChange={(e) => handleChange(e)}
      ></input>
      <button onClick={() => props.onButtonClick(name)}>Search!</button>
    </>
  );
}
