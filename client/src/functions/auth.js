import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {
      /* this is a req.body section */
    },
    {
      /* this is req.headers section */
      headers: {
        authtoken, // authtoken: authtoken 과 같다.
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    { headers: { authtoken } }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    { headers: { authtoken } }
  );
};
