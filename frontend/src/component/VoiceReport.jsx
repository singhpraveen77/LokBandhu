import { useState, useRef } from "react";

export default function VoiceReport() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      chunks.current = [];
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      // Upload to backend
      const formData = new FormData();
      formData.append("voiceReport", blob, "report.webm");
      fetch("/api/report/upload-audio", {
        method: "POST",
        body: formData,
      });
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="p-4 border rounded">
      <button
        onClick={recording ? stopRecording : startRecording}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioURL && (
        <div className="mt-4">
          <p>Preview:</p>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
}
