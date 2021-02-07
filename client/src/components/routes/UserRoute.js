import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;

// const UserRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     component={
//       localStorage.getItem("sweet") ? (
//         <Component {...prop} />
//       ) : (
//         <Redirect to='/' />
//       )
//     }
//   />
// );

// export default UserRoute;

// import React from "react";

// const UserRoute = ({ component: Component, ...rest }) => {
//   const { user } = useSelector((state) => ({ ...state }));
//   return user && user.token ? (
//     <Route {...rest} render={(props) => <Component {...props} />} />
//   ) : (
//     <Redirect to='/' />
//   );
// };

// export default UserRoute;
