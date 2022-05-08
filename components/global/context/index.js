import React from "react";

const authData = {
  _id: null,
  email: null,
  name: null,
  image_profile: null,
  groups_following: [],
  groups_requested: [],
  groups_created: [],
  token: null,
};

export default React.createContext(authData);