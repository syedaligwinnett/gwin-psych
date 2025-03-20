import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../lib/firebase";
// import { collection, doc, getDoc, query, where } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
  //   const [user, setUser] = useState<any>(null);
  //   const [loading, setLoading] = useState(true);
  //   const [currentDate, setCurrentDate] = useState(new Date());

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         let userRole, displayName;
  //         const getRole = async () => {
  //           const docRef = doc(db, "users", user?.uid);
  //           const docSnap = await getDoc(docRef);
  //           const userData = docSnap?.data();
  //           userRole = userData?.role;
  //           displayName = userData?.displayName;
  //           setUser({
  //             uid: user.uid,
  //             email: user.email,
  //             displayName: displayName,
  //             role: userRole,
  //           });
  //         };
  //         getRole();
  //       } else {
  //         setUser(null);
  //       }
  //       setLoading(false);
  //     });

  //     return () => unsubscribe();
  //   }, []);

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setCurrentDate(new Date());
  //     }, 10000);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
