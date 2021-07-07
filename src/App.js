import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Rank from "./components/rank/Rank";
import "tachyons";
import Particles from "react-particles-js";
import { useState } from "react";
import Clarifai from "clarifai";

const detectApp = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY,
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 155,
      },
    },
  },
};

export default function App() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const onSubmit = () => {
    console.log(`input submitted ${input}`);

    setImgUrl(input);

    detectApp.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      function (response) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },
      function (err) {
        //err
      }
    );
  };
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition imgUrl={imgUrl} />
    </div>
  );
}
