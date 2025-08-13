// import React, { useEffect, useState } from "react";

// const DriveFileFetcher = () => {
//   const [data, setData] = useState<string>("");

//   useEffect(() => {
//     fetch(
//       "https://drive.google.com/uc?export=download&id=1QAObCWl5f0Ytc3bUHRREdNVBd4P-dO07"
//     )
//       .then((res) => res.text()) // or res.json() for JSON
//       .then((content) => {
//         setData(content);
//       })
//       .catch((err) => {
//         console.error("Error fetching file:", err);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>File Content:</h2>
//       <pre>{data}</pre>
//     </div>
//   );
// };

// export default DriveFileFetcher;
