// // src/components/ReviewsPanel.jsx
// import React, { useState } from "react";
// import { Star } from "lucide-react";

// import person1 from "../../assets/Dashboard/person1.svg";
// import person2 from "../../assets/Dashboard/person2.svg";
// import person3 from "../../assets/Dashboard/person3.svg";

// const avatars = [person1, person2, person3];

// const reviews = [
//   {
//     id: 1,
//     name: "Ahmed Salah",
//     text: "Best service you will find at KeyFinder you guys are really doing a great job for finding us the best villas at Alexandria",
//   },
//   {
//     id: 2,
//     name: "Mohsen Salah",
//     text: "Friendly service at KeyFinder you guys deserved a big thank you from us for finding us a home at Alex West after searching for months",
//   },
//   {
//     id: 3,
//     name: "Mahmoud Elbanna",
//     text: "Friendly service at KeyFinder you guys deserved a big thank you from us for finding us a home at Alex West after searching for months",
//   },
//   {
//     id: 4,
//     name: "Sarah Islam",
//     text: "Friendly service at KeyFinder you guys deserved a big thank you from us for finding us a home at Alex West after searching for months",
//   },
//   {
//     id: 5,
//     name: "Yehia Mekkour",
//     text: "Friendly service at KeyFinder you guys deserved a big thank you from us for finding us a home at Alex West after searching for months",
//   },
//   {
//     id: 6,
//     name: "Zeyad Asran",
//     text: "Friendly service at KeyFinder you guys deserved a big thank you from us for finding us a home at Alex West after searching for months",
//   },
//   {
//     id: 7,
//     name: "Ziad Asran",
//     text: "Friendly service at KeyFinder you guys deserved a big thank you from us for finding us a home at Alex West after searching for months",
//   },
//   {
//     id: 8,
//     name: "Mohamed Abdelmoniem",
//     text: "Best service you will find at KeyFinder you guys are really doing a great job …",
//   },
//   {
//     id: 9,
//     name: "Youssef Kamal",
//     text: "This Website is the best!!!!!!!!!!! It really helped me finding a home at Borg El-Arab after searching for a long time …",
//   },
//   {
//     id: 10,
//     name: "Ahmed Mohamed",
//     text: "Friendly service at KeyFinder you guys deserved a big thank you …",
//   },
//   {
//     id: 11,
//     name: "Mohamed Abdelmoniem",
//     text: "Best service you will find at KeyFinder you guys are really doing a great job …",
//   },
// ];

// export default function ReviewsPanel() {
//   const [ratings, setRatings] = useState({});
//   const setRating = (id, value) =>
//     setRatings((prev) => ({ ...prev, [id]: value }));

//   return (
//     <div className="relative bg-white rounded-lg shadow-lg flex flex-col w-full">
//       {/* Reviews tab */}
//       <div className="flex justify-center relative z-10 -mt-1 mb-8">
//         <div className="bg-[#001F54] text-white px-6 py-3 rounded-lg ">
//           Reviews
//         </div>
//       </div>

//       {/* Section title */}
//       <div className="text-center font-semibold  mb-8">Buyer Review</div>

//       {/* List (no inner overflow-y—page scrollbar will handle it) */}
//       <div className="flex-1 space-y-4 px-6 pb-4">
//         {reviews.map((review, idx) => (
//           <div
//             key={review.id}
//             className="flex items-center border border-gray-300 rounded py-3 px-4"
//           >
//             <img
//               src={avatars[idx % avatars.length]}
//               alt={review.name}
//               className="w-12 h-12 object-cover rounded"
//             />

//             <div className="flex-1 ml-4 space-y-1">
//               <p className="font-semibold text-sm">{review.name}</p>
//               <p className="text-xs text-gray-700">{review.text}</p>
//             </div>

//             <div className="flex items-center space-x-1 mx-4">
//               {Array.from({ length: 5 }).map((_, i) => {
//                 const filled = (ratings[review.id] || 0) > i;
//                 return (
//                   <button
//                     key={i}
//                     onClick={() => setRating(review.id, i + 1)}
//                     className="focus:outline-none"
//                   >
//                     <Star
//                       size={18}
//                       className={filled ? "text-[#FFD700]" : "text-gray-300"}
//                       fill={filled ? "#FFD700" : "none"}
//                     />
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="flex gap-2">
//               <button className="px-3 py-1 bg-[#002349] text-white rounded text-xs">
//                 Approve
//               </button>
//               <button className="px-3 py-1 bg-[#002349] text-white rounded text-xs">
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
