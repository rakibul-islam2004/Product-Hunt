import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import { auth, googleProvider } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithEmail = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      Cookies.set("jwt", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      setUser(user);
      return { token };
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many failed login attempts. Please try again later.";
          break;
        default:
          errorMessage = "An error occurred. Please try again later.";
      }
      throw new Error(errorMessage);
    }
  };

  const registerWithEmail = async (email, password, name, role, photoURL) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name, photoURL });
      const token = await user.getIdToken();
      Cookies.set("jwt", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      setUser({ ...user, role });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const token = await user.getIdToken();
      Cookies.set("jwt", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      setUser(user);
      return { token }; 
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    Cookies.remove("jwt");
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        Cookies.set("jwt", token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        setUser(user);
      } else {
        Cookies.remove("jwt");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#123abc" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
