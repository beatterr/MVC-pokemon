import React from "react";

export default function Pokemon({image}) {
  return (
    <>
     <img
       src={image}
       alt="pokemon_image"
     />
     </>
  );
}
