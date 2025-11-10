// import React, { useEffect, useState } from "react";
// import "../styles/characterModal.css";

// const CharacterModal = ({ index, SetClickedIndex, SetIsClicked }) => {
//   const [character, setCharacter] = useState(null);
//    const [homeworld, setHomeworld] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getCharacter = async () => {
//       try {
//         setLoading(true);
//         // SWAPI index starts from 1
//         const res = await fetch(`https://swapi.dev/api/people/${index+1}/`);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const parsed = await res.json();
//         setCharacter(parsed);
//         const homeworldRes = await fetch(parsed.homeworld);
//         const homeworldData = await homeworldRes.json();
//         setHomeworld(homeworldData);
//       } catch (e) {
//         setError(e.message || "Failed to fetch character");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getCharacter();
//   }, [index]);

//   if (loading) {
//     return (
//       <div className="modalOverlay">
//         <div className="modalBox">
//           <p>Loading character...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="modalOverlay">
//         <div className="modalBox">
//           <p style={{ color: "red" }}>{error}</p>
//           <button onClick={() => SetClickedIndex(null)}>Close</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="modalOverlay" onClick={() => SetIsClicked (false)}>
//       <div className="modalBox" onClick={(e) => e.stopPropagation()}>
//         <button className="closeBtn" onClick={() => SetIsClicked (false)}>
//           ✕
//         </button>
//         <h2>{character.name}</h2>
//         <p><strong>Height:</strong> {character.height/100}</p>
//         <p><strong>Mass:</strong> {character.mass}</p>
//         <p><strong>No. of Films:</strong> {character.films.length}</p>
//         <p><strong>Gender:</strong> {character.gender}</p>
       
//         <p><strong>Birth Year:</strong> {character.birth_year}</p>
//         <p><strong>Hair Color:</strong> {character.hair_color}</p>
//         <p><strong>Skin Color:</strong> {character.skin_color}</p>
//          {homeworld && (
//             <>
//               <h3 className="homeworldTitle">Homeworld Details</h3>
//               <p><strong>Name:</strong> {homeworld.name}</p>
//               <p><strong>Terrain:</strong> {homeworld.terrain}</p>
//               <p><strong>Climate:</strong> {homeworld.climate}</p>
//               <p><strong>Population:</strong> {homeworld.population}</p>
//             </>
//           )}
//       </div>
//     </div>
//   );
// };

// export default CharacterModal;

import React, { useEffect, useState } from "react";
import "../styles/characterModal.css";

const CharacterModal = ({ index, SetClickedIndex, SetIsClicked }) => {
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://swapi.dev/api/people/${index + 1}/`);
        const parsed = await res.json();
        setCharacter(parsed);
        const hwRes = await fetch(parsed.homeworld);
        const hwData = await hwRes.json();
        setHomeworld(hwData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    getCharacter();
  }, [index]);

  const handleClose = () => {
    SetIsClicked(false);
    SetClickedIndex(null);
  };

  if (loading)
    return (
      <div className="modalOverlay">
        <div className="modalBox">
          <p>Loading character...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="modalOverlay">
        <div className="modalBox">
          <p>{error}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    );

  const height =
    !isNaN(Number(character.height))
      ? `${(character.height / 100).toFixed(2)} m`
      : "Unknown";
  const mass = isNaN(Number(character.mass))
    ? "Unknown"
    : `${character.mass} kg`;

  return (
    <div className="modalOverlay" onClick={handleClose}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={handleClose}>
          ✕
        </button>
        <h2>{character.name}</h2>
        <p>
          <strong>Height:</strong> {height}
        </p>
        <p>
          <strong>Mass:</strong> {mass}
        </p>
        <p>
          <strong>No. of Films:</strong> {character.films.length}
        </p>
        <p>
          <strong>Birth Year:</strong> {character.birth_year}
        </p>
        {homeworld && (
          <>
            <h3 className="homeworldTitle">Homeworld Details</h3>
            <p>
              <strong>Name:</strong> {homeworld.name}
            </p>
            <p>
              <strong>Terrain:</strong> {homeworld.terrain}
            </p>
            <p>
              <strong>Climate:</strong> {homeworld.climate}
            </p>
            <p>
              <strong>Population:</strong> {homeworld.population}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterModal;
