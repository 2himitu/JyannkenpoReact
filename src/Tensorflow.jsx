import React, { useRef, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';

const TeachableMachineComponent = () => {
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);
  let model, webcam, labelContainer, maxPredictions;

  useEffect(() => {
    const init = async () => {
      const URL = 'https://teachablemachine.withgoogle.com/models/rRxoAbERs/';
      const modelURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      webcam = new tmImage.Webcam(200, 200, true);
      await webcam.setup();
      await webcam.play();
      window.requestAnimationFrame(loop);

      const webcamContainer = document.getElementById('webcam-container');
      webcamContainer.appendChild(webcam.canvas);

      labelContainer = labelContainerRef.current;
      for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement('div'));
      }
    };

    const loop = async () => {
      webcam.update();
      await predict();
      window.requestAnimationFrame(loop);
    };

    const predict = async () => {
      const prediction = await model.predict(webcam.canvas);
      for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
          prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
      }
    };

    init();

    return () => {
      webcam.stop();
    };
  }, []);

  return (
    <div>
      <div id="webcam-container"></div>
      <div ref={labelContainerRef} id="label-container"></div>
    </div>
  );
};

export default TeachableMachineComponent;