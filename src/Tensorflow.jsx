import React, { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const TeachableMachineComponent = () => {
  const URL = "https://teachablemachine.withgoogle.com/models/rRxoAbERs/";
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [labelContainer, setLabelContainer] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const init = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      try {
        // Load the model and metadata
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setMaxPredictions(loadedModel.getTotalClasses());

        // Setup the webcam
        const flip = true; // whether to flip the webcam
        const newWebcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await newWebcam.setup(); // request access to the webcam
        await newWebcam.play();
        setWebcam(newWebcam);

        // Append elements to the DOM
        const newLabelContainer = document.getElementById("label-container");
        setLabelContainer(newLabelContainer);
        if (newLabelContainer) {
          for (let i = 0; i < maxPredictions; i++) {
            newLabelContainer.appendChild(document.createElement("div"));
          }
        }
      } catch (error) {
        console.error("Error initializing Teachable Machine:", error);
      }
    };
    init();
    // Clean-up
    return () => {
      if (webcam) {
        webcam.stop();
      }
    };
  }, [URL, maxPredictions, webcam]);

  const loop = async (init) => {
    if (webcam && webcam.canvas) {
      webcam.update(); // Update the webcam frame
      await predict();
      window.requestAnimationFrame(loop);
    }
  };

  // Run the webcam image through the image model
  const predict = async () => {
    if (model && webcam && labelContainer) {
      const prediction = await model.predict(webcam.canvas);
      for (let i = 0; i < maxPredictions; i++) {
        if (labelContainer.childNodes[i]) {
          const className = prediction[i].className;
          const probability = prediction[i].probability.toFixed(2);

          // 각 클래스와 해당 확률을 변수로 지정
          const classPrediction = {
            className: className,
            probability: probability,
          };

          // 변수로 지정된 값을 사용하여 원하는 작업 수행
          console.log(classPrediction.className);
          console.log(classPrediction.probability);

          // 또는 필요에 따라 변수로 저장
          // const { className, probability } = classPrediction;
          // console.log(className);
          // console.log(probability);

          labelContainer.childNodes[
            i
          ].innerHTML = `${className}: ${probability}`;
        }
      }
    }
  };

  useEffect(() => {
    if (webcam && open) {
      window.requestAnimationFrame(loop);
    }
  }, [loop]);

  return (
    <div>
      <div>Teachable Machine Image Model</div>
      <button type="button" onClick={toggleModal}>
        Start
      </button>
      <div id="webcam-container">
        {webcam && (
          <canvas
            ref={(canvas) => (webcam.canvas = canvas)}
            width={200}
            height={200}
          />
        )}
      </div>
      <div id="label-container"></div>
    </div>
  );
};

export default TeachableMachineComponent;
