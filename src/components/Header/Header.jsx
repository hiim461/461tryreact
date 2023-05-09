import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../slices/userSlice";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignin = () => {
    //Chuyển sang trang /signin: sử dụng navigate
    navigate("/signin");
  };
  const handleSignout = () => {
    dispatch(signout());
    localStorage.removeItem("user");
  };
  return (
    <div style={{ backgroundColor: "yellow", display: "flex" }}>
      <h3>CyberMovie</h3>

      <div style={{ marginLeft: "auto", display: "flex" }}>
        {user ? (
          <>
            {" "}
            <p>{user.hoTen}</p>
            <button onClick={handleSignout}>Logout</button>
          </>
        ) : (
          <button onClick={handleSignin}>Login</button>
        )}
      </div>
    </div>
  );
}

export default Header;
