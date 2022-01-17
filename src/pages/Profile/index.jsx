import React from "react";
import { Outlet, useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();

  return (
    <div>
      profile {params?.id}
      <Outlet />
    </div>
  );
};

export default Profile;
