import { useEffect, useState } from "react";
import {
  AuthContextType,
  DataUserProps,
  User,
  UserSignInProps,
  UserSignUpProps,
} from "../components/types/AuthType";

import { ReactNode, createContext } from "react";
import { auth, db } from "../services/firebaseConection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const localStorageKey = "@dataUserBancoHoras";

  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUSer, setLoadingUser] = useState<boolean>(true);
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);

  //messagen de erro
  const [statusMessage, setStatusMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const userData = localStorage.getItem(localStorageKey);
      if (userData) {
        const userSigned = JSON.parse(userData);
        setUser(userSigned);
        setLoadingUser(false);
      }
      setLoadingUser(false);
    }
    loadUser();
  }, []);

  async function handleAddDocUser(data: any, name: string) {
    try {
      await Promise.all([
        setDoc(doc(db, "users", data.user.uid), {
          name: name,
          email: data.user.email,
          createdAcount: new Date(),
        }),
        setDoc(doc(db, "banco-horas", data.user.uid), {
          name: name,
          createdAcount: new Date(),
          banco: null,
        }),
      ]);

      const dataDoc = {
        uid: data.user.uid,
        name: name,
        createdAcount: new Date(),
        email: data.user.email,
        banco: null,
      };
      setUser(dataDoc);
      storageUser(dataDoc);
      setLoadingLogin(false);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setLoadingLogin(false);
    }
  }

  function handleMessage() {
    setTimeout(() => {
      setStatusMessage("");
    }, 5000);
  }

  async function signUp({ name, email, password }: UserSignUpProps) {
    setLoadingLogin(true);
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleAddDocUser(userData, name);
    } catch (error: any) {
      setLoadingLogin(false);
      if (error.code === "auth/email-already-in-use") {
        setStatusMessage("Este email já está sendo utilizado!");
        handleMessage();
        return;
      }
      console.log(error);
    }
  }

  async function signIn({ email, password }: UserSignInProps) {
    setLoadingLogin(true);
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const docUserRef = doc(db, "users", userData.user.uid);
      const docBancoRef = doc(db, "users", userData.user.uid);

      const [dataUser, dataBanco] = await Promise.all([
        getDoc(docUserRef),
        getDoc(docBancoRef),
      ]);
      const userDoc = {
        uid: dataUser.id,
        name: dataUser.data()?.name,
        email: dataUser.data()?.email,
        createdAcount: dataUser.data()?.createdAcount,
        banco: dataBanco.data()?.banco,
      };

      setUser(userDoc);
      storageUser(userDoc);
      setLoadingLogin(false);
      navigate("/home");
    } catch (error: any) {
      setLoadingLogin(false);
      if (error.code === "auth/user-not-found") {
        setStatusMessage("Este email não está cadastrado!");
        handleMessage();
        return;
      }
      if (error.code === "auth/wrong-password") {
        setIncorrectPassword(true);
        setStatusMessage("Senha incorreta!");
        handleMessage();
        return;
      }
      console.log(error);
    }
  }

  async function storageUser(data: DataUserProps) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  async function logOut() {
    try {
      await signOut(auth);
      localStorage.removeItem(localStorageKey);
      setUser(null);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        setUser,
        signUp,
        signIn,
        loadingLogin,
        incorrectPassword,
        statusMessage,
        setIncorrectPassword,
        loadingUSer,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
