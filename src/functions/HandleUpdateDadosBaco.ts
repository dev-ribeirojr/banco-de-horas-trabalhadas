import { HandleUpdateDadosBancoProps } from "../components/types/HomeTypes";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConection";

export async function handleUpdateDadosBanco({
  dadosBanco,
  setSave,
  setLoading,
  user,
  setUser,
  storageUser,
  setSucess,
}: HandleUpdateDadosBancoProps) {
  setLoading(true);

  try {
    const docRef = doc(db, "banco-horas", user?.uid!);
    await updateDoc(docRef, {
      banco: dadosBanco,
    });
    setLoading(false);
    setSave(false);

    const userData = user!;
    userData.save = false;
    storageUser(userData);
    setUser(userData);
    setSucess(true);

    setTimeout(() => {
      setSucess(false);
    }, 2000);
  } catch (error) {
    setLoading(false);
  }
}
