import { useEffect, useState } from "react";
import {
  AuthContextType,
  DataUserProps,
  UserSignInProps,
  UserSignUpProps,
} from "../components/@types/AuthType";

import { ReactNode, createContext } from "react";
import { auth, db } from "../services/firebaseConection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const localStorageKey = "@dataUserBancoHoras";

  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [user, setUser] = useState<object>();
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

  async function signUp({ name, email, password }: UserSignUpProps) {
    setLoadingLogin(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        await setDoc(doc(db, "users", data.user.uid), {
          name: name,
          email: email,
          createdAcount: new Date(),
        })
          .then(() => {
            const dataDoc = {
              uid: data.user.uid,
              name: name,
              email: email,
              createdAcount: new Date(),
            };
            setUser(dataDoc);
            storageUser(dataDoc);
            setLoadingLogin(false);
            navigate("/home");
          })
          .catch((er) => {
            console.log(er);
            setLoadingLogin(false);
          });
      })
      .catch((er) => {
        setLoadingLogin(false);
        if (er.code === "auth/email-already-in-use") {
          setStatusMessage("Este email já está sendo utilizado!");
          handleMessage();
          return;
        }
        console.log(er);
      });
  }

  async function signIn({ email, password }: UserSignInProps) {
    setLoadingLogin(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        const docRef = doc(db, "users", data.user.uid);
        await getDoc(docRef).then((snap) => {
          const daocData = snap.data();
          const userDoc = {
            uid: data.user.uid,
            name: daocData?.name,
            email: daocData?.email,
            createdAcount: daocData?.createdAcount,
          };
          setUser(userDoc);
          storageUser(userDoc);
          setLoadingLogin(false);
          navigate("/home");
        });
        setLoadingLogin(false);
      })
      .catch((er) => {
        setLoadingLogin(false);
        if (er.code === "auth/user-not-found") {
          setStatusMessage("Este email não está cadastrado!");
          handleMessage();
          return;
        }
        if (er.code === "auth/wrong-password") {
          setIncorrectPassword(true);
          setStatusMessage("Senha incorreta!");
          handleMessage();
          return;
        }

        console.log(er);
      });
  }

  function handleMessage() {
    setTimeout(() => {
      setStatusMessage("");
    }, 5000);
  }

  async function storageUser(data: DataUserProps) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        signUp,
        signIn,
        loadingLogin,
        incorrectPassword,
        statusMessage,
        setIncorrectPassword,
        loadingUSer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
