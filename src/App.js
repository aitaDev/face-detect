import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Rank from "./components/rank/Rank";
import SignIn from "./components/signin/SignIn";
import Register from "./components/register/Register";
import "tachyons";
import Particles from "react-particles-js";
import { useState } from "react";
import Clarifai from "clarifai";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const detectApp = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY,
});

const particlesOptions = {
  particles: {
    move: {
      speed: 1,
    },
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
  const [box, setBox] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [name, setName] = useState("");

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    setName(data.outputs[0].data.regions[0].data.concepts[0].name);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);
  };

  const onSubmit = () => {
    console.log(`input submitted ${input}`);

    setImgUrl(input);

    detectApp.models
      .predict(Clarifai.CELEBRITY_MODEL, input)
      .then((response) => displayFaceBox(calculateFaceLocation(response)))
      .catch((err) => console.log(err));
  };
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation signedIn={signedIn} />
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Logo />
            {/* <Rank /> */}
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            {imgUrl && (
              <FaceRecognition imgUrl={imgUrl} box={box} name={name} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
