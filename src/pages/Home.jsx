import { Link } from "react-router-dom";

function Home({
  recording,
  stopRecording,
  startRecording,
  playAudio,
  audioBlob,
  handleLogout,
  audioPlaying,
  setAudioPlaying,
  playMariah,
  random,
  setRandom,
  mariah,
  setMariah,
}) {
  function handleMariah() {
    playMariah();
    setRandom(Math.random() < 0.5 ? true : false);
  }

  return (
    <div className="home mt-20 text-center">
      <h2 className="text-red-800 text-center ">
        Hi {localStorage.getItem("name")}
        <span className="text-3xl">
          {mariah && <h1>You abused application... MARIAH ATTACKS !!!!!!</h1>}
        </span>
      </h2>
      <p className="text-green-800">
        Click a MIC and hear how you sound after too much alcohol during
        CHRISTMAS
      </p>

      <img
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        src={audioPlaying ? "/img/santa.gif" : "/img/santa.png"}
        alt="Santa"
        style={{ maxWidth: "50vh" }}
      />
      <button
        onClick={
          mariah
            ? handleMariah
            : random
            ? handleMariah
            : recording
            ? stopRecording
            : startRecording
        }
        className="absolute right-5 bottom-5 flex flex-col items-center"
      >
        {mariah ? (
          <h3 className="bg-red-400 p-2 rounded-xl text-white">Stop Mariah</h3>
        ) : recording ? (
          <h3 className="bg-red-400 p-2 rounded-xl ">Stop recording</h3>
        ) : (
          <h3 className="bg-red-400 p-2 rounded-xl">Start recording</h3>
        )}
        <img src="/img/mic.svg" alt="mic" />
      </button>
    </div>
  );
}

export default Home;
