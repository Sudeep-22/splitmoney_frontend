import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const initialize = async () => {
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
  }, [dispatch, navigate, suppressAlert]);

  return null;
};

export default AuthInitializer;