import "./statusMessage.css";
type MessageError = {
  statusMessage: string;
  status: "info-error" | "info-sucess";
};

export default function StatusText({ statusMessage, status }: MessageError) {
  return <p className={`info-message ${status}`}>{statusMessage}</p>;
}
