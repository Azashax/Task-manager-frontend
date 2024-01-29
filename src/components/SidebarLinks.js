// import { Link } from 'react-router-dom';
// import React from 'react';

// const SidebarLinks = ({ user, sidebar, roleData }) => {
//   return (
//     <li>
//       {user && user.role && roleData[user.role] && roleData[user.role].map((item, index) => (
//         <li key={index} className={item.cName}>
//           <Link to={item.path}>
//             {item.icon}
//             <span style={sidebar ? { display: "none" } : {}}>
//               {item.title}
//             </span>
//           </Link>
//         </li>
//       ))}
//     </li>
//   );
// };

// export default SidebarLinks;

import { Link } from 'react-router-dom';
import React from 'react';

const SidebarLinks = ({ user, sidebar, roleData }) => {
  const links = user && user.role && roleData[user.role] ? roleData[user.role] : [];

  return (
    <ul className={links.length > 8 ? "nav-menu-items active" : "nav-menu-items"}>
      {links.map((item, index) => (
        <li key={index} className={item.cName}>
          <Link to={item.path}>
            {item.icon}
            <span style={sidebar ? { display: "none" } : {}}>
              {item.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarLinks;
