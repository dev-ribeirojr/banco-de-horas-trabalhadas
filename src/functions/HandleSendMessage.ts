import emailjs from "@emailjs/browser";
import { Dispatch, SetStateAction } from "react";
import { SendText } from "../components/types/SuportTypes";

export async function handleSendText({
  text,
  email,
  name,
  setMessageStatus,
  setLoading,
  reset,
}: SendText) {
  function handleCleanMessage() {
    setTimeout(() => {
      setMessageStatus("");
    }, 4000);
  }

  const templatesParams = {
    from_name: name.toUpperCase(),
    message: text,
    email: email,
  };

  try {
    await emailjs.send(
      "service_dvclfho",
      "template_so7fzjk",
      templatesParams,
      "EtMlGndncK2OZa-3E"
    );
    reset();
    setLoading(false);
    setMessageStatus("Mensagem enviada com sucesso!");
    handleCleanMessage();
  } catch (error: any) {
    setLoading(false);
    console.log(error);
    setMessageStatus("Erro ao enviar a mensagem!");
    handleCleanMessage();
  }
}
// process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
//   process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID,
//   templatesParams,
//   process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY;
