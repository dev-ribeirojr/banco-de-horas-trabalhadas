type MessageError = {
  statusMessage: string;
};

export default function ErrorText({ statusMessage }: MessageError) {
  return <p className="info-message info-error">{statusMessage}</p>;
}
