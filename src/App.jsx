import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import * as Tone from "tone";
import axios from "axios";
import AudioPlayer from "./components/AudioPlayer";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Header from "./components/Header";

function RecordingsList({ userId }) {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const urls = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/getUserRecordingsUrls/${userId}`
        );

        if (urls.data.recordings.length > 0) {
          const blobs = [];
          for (let i = 0; i < urls.data.recordings.length; i++) {
            const filePath = urls.data.recordings[i].file_path;

            const response = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/getUserRecordings`,
              {
                headers: {
                  pathfile: filePath,
                },
              }
            );
            const blob = await response.blob();
            blobs.push({ blob, filePath });
          }
          setAudios(blobs);
        }
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, [userId]);

  const deleteRecording = async (path) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/deleteRecording` + path
      );
      setAudios(audios.filter((audio) => audio.filePath !== path));
    } catch (error) {
      console.error("Error deleting recording:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-5/6 m-auto p-10 overflow-auto scrollbar-hide">
      <div className="h-full">
        <h2 className="text-3xl">Your Recordings</h2>
        <ul className="flex flex-col gap-5">
          {audios.length > 0 &&
            audios.map((audio, index) => {
              return (
                <div key={audio.filePath} className="flex gap-1">
                  <AudioPlayer
                    audioData={audio.blob}
                    filePath={audio.filePath}
                  />
                  <button onClick={() => deleteRecording(audio.filePath)}>
                    <svg
                      width="33"
                      height="33"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      id="IconChangeColor"
                    >
                      {" "}
                      <path
                        d="M8.99219 14H11.9922M14.9922 14H11.9922M11.9922 14V11M11.9922 14V17"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        id="mainIconPathAttribute"
                        fill="#ff006a"
                      ></path>{" "}
                      <path
                        d="M3.03919 4.2939C3.01449 4.10866 3.0791 3.92338 3.23133 3.81499C3.9272 3.31953 6.3142 2 12 2C17.6858 2 20.0728 3.31952 20.7687 3.81499C20.9209 3.92338 20.9855 4.10866 20.9608 4.2939L19.2616 17.0378C19.0968 18.2744 18.3644 19.3632 17.2813 19.9821L16.9614 20.1649C13.8871 21.9217 10.1129 21.9217 7.03861 20.1649L6.71873 19.9821C5.6356 19.3632 4.90325 18.2744 4.73838 17.0378L3.03919 4.2939Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        id="mainIconPathAttribute"
                        fill="#ff006a"
                      ></path>{" "}
                      <path
                        d="M3 5C5.57143 7.66666 18.4286 7.66662 21 5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        id="mainIconPathAttribute"
                        fill="#ff006a"
                      ></path>{" "}
                    </svg>{" "}
                  </button>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [recording, setRecording] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [nameRegister, setNameRegister] = useState("");

  const [random, setRandom] = useState(false);

  const [player, setPlayer] = useState("");

  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/wav" });

      setAudioBlob(blob);
      const audioInstance = new Audio(URL.createObjectURL(blob));

      //////////////////////////////////
      //////////////////////////////////

      const player = new Tone.Player().toDestination();

      player.load(URL.createObjectURL(blob)).then(() => {
        // Set the playback rate to change the pitch
        const playbackRate = 1.5; // Adjust this value to change the pitch
        player.playbackRate = playbackRate;

        // Start playing the audio
        Tone.start().then(() => {
          setAudioPlaying(true);
          player.start();
        });
      });

      player.onstop = () => {
        setAudioPlaying(false);
      };

      setPlayer(player);

      // Load the audio data into the player

      // Set the playback rate to change the pitch

      // Start playing the audio

      //////////////////////////////////
      //////////////////////////////////

      // Save the recording to the server
      try {
        const formData = new FormData();
        formData.append("audioBlob", blob, "recording.wav");

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/saveRecording/${userId}`,
          formData
        );

        // audioInstance.play();
      } catch (error) {
        console.error("Error saving recording:", error);
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const playMariah = async () => {

    const player = new Tone.Player().toDestination();
    player.load("/extraSound/m.wav").then(() => {
      // Set the playback rate to change the pitch
      const playbackRate = 1.5; // Adjust this value to change the pitch
      player.playbackRate = playbackRate;
      Tone.start().then(() => {
        player.start();
      });
    });

  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    setRandom(Math.random() < 0.5 ? true : false);
  };

  const playAudio = () => {
    const player = new Tone.Player().toDestination();
    player.load(URL.createObjectURL(audioBlob)).then(() => {
      // Set the playback rate to change the pitch
      const playbackRate = 1.5; // Adjust this value to change the pitch
      player.playbackRate = playbackRate;

      // Start playing the audio
      Tone.start().then(() => {
        setAudioPlaying(true);
        player.start();
      });
    });

    player.onstop = () => {
      setAudioPlaying(false);
    };
  };

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email: emailLogin,
          password: passwordLogin,
        }
      );
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("name", response.data.name);
      setEmailLogin("");
      setPasswordLogin("");
      setUserId(response.data.userId);
      setName(response.data.name);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        {
          email: emailRegister,
          password: passwordRegister,
          name: nameRegister,
        }
      );
      setUserId(response.data.userId);
      setEmailRegister("");
      setPasswordRegister("");
      alert("Succes");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <div className="bg-gradient-to-r from-orange-300 to-rose-300 h-screen overflow-hidden flex flex-col justify-items-center items-center">
      <Router>
        <Header handleLogout={handleLogout} />
        {localStorage.getItem("userId") ? (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  recording={recording}
                  stopRecording={stopRecording}
                  startRecording={startRecording}
                  playAudio={playAudio}
                  audioBlob={audioBlob}
                  handleLogout={handleLogout}
                  audioPlaying={audioPlaying}
                  setAudioPlaying={setAudioPlaying}
                  playMariah={playMariah}
                  random={random}
                  setRandom={setRandom}
                />
              }
            />

            <Route
              path="/recordings"
              element={<RecordingsList userId={userId} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Connect
                  emailLogin={emailLogin}
                  passwordLogin={passwordLogin}
                  emailRegister={emailRegister}
                  passwordRegister={passwordRegister}
                  setEmailLogin={setEmailLogin}
                  setPasswordLogin={setPasswordLogin}
                  setEmailRegister={setEmailRegister}
                  setPasswordRegister={setPasswordRegister}
                  handleRegister={handleRegister}
                  handleLogin={handleLogin}
                  nameRegister={nameRegister}
                  setNameRegister={setNameRegister}
                />
              }
            />
            <Route
              path="/recordings"
              element={<div className="mt-10 text-3xl">LOGIN FIRST !!! </div>}
            />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
