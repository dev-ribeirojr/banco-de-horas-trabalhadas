import emailjs from "@emailjs/browser";
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
      (import.meta.env.VITE_EMAIL_JS_SERVICE_ID = "service_dvclfho"),
      (import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID = "template_so7fzjk"),
      templatesParams,
      (import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY = "EtMlGndncK2OZa-3E")
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
