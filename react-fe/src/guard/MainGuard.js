import React from "react";

const MainGuard = ({ children }) => {
  //   const { user, loading, accessToken, refetch } = useUser();
  //   const isOnline = window.navigator.onLine;
  //   const { pathname } = useLocation();

  //   useEffect(() => {
  //     refetch();
  //   }, [pathname]);

  //   if (!isOnline && localStorage.getItem("token")) return <>{children}</>;
  //   if (!user && !accessToken) return <Navigate to="/login" />;
  //   if (loading && accessToken) return <Loader />;
  return <>{children}</>;
};

export default MainGuard;
