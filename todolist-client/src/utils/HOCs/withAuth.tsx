import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../store/slices/authSlice";

const withAuth = (WrappedComponent: ComponentType, shouldBeLogged: boolean) => {
  return () => {
    const user = useSelector(getUser);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user.userId && shouldBeLogged) {
        navigate("/login");
      }

      if (!!user.userId && !shouldBeLogged) {
        navigate("/");
      }
    }, [user]);

    return <WrappedComponent />;
  };
};

export default withAuth;

// hook for todo data to map it
