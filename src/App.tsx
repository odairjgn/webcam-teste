import React, { useCallback, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Webcam from "react-webcam";

type Modo = "fotos" | "video";

function App() {
  const [inverter, setInverter] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const configs: MediaTrackConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const handleCapturar = useCallback(() => {
    const foto = webcamRef.current?.getScreenshot();
    downloadBase64Jpg(foto!);
  }, [webcamRef]);

  function downloadBase64Jpg(contentBase64: string) {
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = contentBase64;
    downloadLink.target = "_self";
    downloadLink.download = new Date().toISOString() + ".jpg";
    downloadLink.click();
  }

  return (
    <div className="App">
      <div className="container">
        <div>
          <h2>Captura de foto</h2>
        </div>
        <div>
          <input
            type="checkbox"
            name="inverter"
            checked={inverter}
            onChange={(e) => setInverter(e.target.checked)}
          />
          <label htmlFor="inverter">Inverter</label>
        </div>
        <div className="camera">
          <Webcam
            ref={webcamRef}
            height={360}
            screenshotFormat="image/jpeg"
            videoConstraints={configs}
            mirrored={inverter}
          />
        </div>
        <button onClick={handleCapturar}>Capturar</button>
      </div>
    </div>
  );
}

export default App;
