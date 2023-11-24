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
  setRandom
}) {

  function handleMariah() {
    playMariah()
    setRandom(Math.random() < 0.5 ? true : false);
  }


  return (
    <div className="home mt-20">
      <h2 className="text-red-800 text-center ">
        Hi {localStorage.getItem("name")}
      </h2>
      <p className="text-green-800">
        Click a MIC and hear how you sound after to much alco during CHRISTMAS
      </p>

      <button
        onClick={random ? handleMariah : (recording ? stopRecording : startRecording)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex"
      >
        <img
          // className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={audioPlaying ? "/img/santa.gif" : "/img/santa.png"}
          alt="Santa"
        />
        <img className="" src="/img/mic.svg" alt="mic" />
        {recording ? (
          <h3 className="bg-red-400 p-2 rounded-xl ">Stop recording</h3>
        ) : (
          <h3 className="bg-red-400 p-2 rounded-xl">Start recording</h3>
        )}
      </button>
    </div>
  );
}

export default Home;
