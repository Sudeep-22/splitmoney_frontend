import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken, clearToken } from "../features/auth/authUtils";
import { refreshAccessTokenThunk } from "../features/auth/authThunks";
import type { AppDispatch } from "../app/store";

const AuthInitializer = ({
  onReady,
  suppressAlert = true,
}: {
  onReady: () => void;
  suppressAlert?: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      const publicRoutes = ["/login", "/signUp"];
      if (publicRoutes.includes(location.pathname)) {
        onReady();
        return;
      }

      try {
        const token = getToken();
        if (!token) {
          onReady();
          return;
        }

        const result = await dispatch(refreshAccessTokenThunk());

        if (!refreshAccessTokenThunk.fulfilled.match(result)) {
          console.error("Token refresh failed");
          clearToken();
          navigate("/login");
        }
      } catch (err) {
        if (!suppressAlert) {
          console.error("Refresh error:", err);
        }
        clearToken();
        navigate("/login");
      } finally {
        onReady();
      }
    };

    initialize();
  }, [dispatch, navigate, suppressAlert, location.pathname]);

  return null;
};

export default AuthInitializer;