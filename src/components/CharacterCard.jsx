// import React, { useState } from 'react';
// import '../styles/characterCard.css'; 
// import CharacterModal from './CharacterModal';

// const CharacterCard = ({ name,SetIsClicked,index,SetClickedIndex}) => {
//     const handleClick =  ()=>{
//         SetIsClicked(true)
//         SetClickedIndex(index)
//     }
//     const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(name)}/200`;

//   return (
    
//     <div className="characterCard" onClick={handleClick}>
//       <img
//         src={imageUrl}
//         alt={`${name} - character`}
//         className="characterImage"
//       />
//       <h2 className="characterName">{name}</h2>
//     </div>
  
    
//   );
// };

// export default CharacterCard;

import React, { useState } from "react";
import "../styles/characterCard.css";

const CharacterCard = ({ name, index, setIsClicked, setClickedIndex }) => {
  const [src, setSrc] = useState(
    `https://picsum.photos/seed/${encodeURIComponent(name)}/200`
  );

  const handleClick = () => {
    setIsClicked(true);
    setClickedIndex(index);
  };

  return (
    <div className="characterCard" onClick={handleClick}>
      <img
        src={src}
        alt={name}
        className="characterImage"
        onError={() =>
          setSrc(`https://picsum.photos/seed/fallback-${index}/200`)
        }
      />
      <h2 className="characterName">{name}</h2>
    </div>
  );
};

export default CharacterCard;
