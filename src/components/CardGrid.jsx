// import React from 'react';
// import { useState } from 'react';
// import CharacterCard from './CharacterCard';
// import '../styles/cardGrid.css'; // CSS file for styling
// import CharacterModal from './CharacterModal';

// const CardGrid = ({ resArray }) => {
//   if (!resArray || resArray.length === 0) {
//     return <p className="no-results">No characters found.</p>;
//   }
//    const [ isClicked,SetIsClicked] = useState(false)
//    const [ clickedIndex,SetClickedIndex] = useState(null)
//   return (
//     <div className="cardGrid">
//       {resArray.map((item, index) => (
//         <CharacterCard key={index} index={index} SetClickedIndex={SetClickedIndex} name={item.name} SetIsClicked={SetIsClicked}/>
//       ))}
//       {isClicked && <CharacterModal index = {clickedIndex} SetClickedIndex={SetClickedIndex} SetIsClicked={SetIsClicked}/>}
//     </div>
//   );
// };

// export default CardGrid;


import React, { useState } from "react";
import CharacterCard from "./CharacterCard";
import CharacterModal from "./CharacterModal";
import "../styles/cardGrid.css";

const CardGrid = ({ resArray }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  if (!resArray || resArray.length === 0)
    return <p className="no-results">No characters found.</p>;

  return (
    <div className="cardGrid">
      {resArray.map((item, index) => (
        <CharacterCard
          key={index}
          index={index}
          name={item.name}
          setIsClicked={setIsClicked}
          setClickedIndex={setClickedIndex}
        />
      ))}

      {isClicked && clickedIndex !== null && (
        <CharacterModal
          index={clickedIndex}
          SetIsClicked={setIsClicked}
          SetClickedIndex={setClickedIndex}
        />
      )}
    </div>
  );
};

export default CardGrid;
