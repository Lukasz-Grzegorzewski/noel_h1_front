import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const AudioPlayer = ({ audioData, filePath }) => {
  const audioRef = useRef(null);

  const [audioPlayer, setAudioPlayer] = useState(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const date = new Date(Number(filePath.split("_")[1].split(".")[0]));
    setTime(date.toLocaleString());
    const audioUrl = URL.createObjectURL(audioData);
    // setAudioPlayer(URL.createObjectURL(audioData));

    const player = new Tone.Player().toDestination();
    player.load(audioUrl).then(() => {
      // Set the playback rate to change the pitch
      const playbackRate = 1.5; // Adjust this value to change the pitch
      player.playbackRate = playbackRate;
      console.log(player);
    });
    setAudioPlayer(player);
  }, [audioData]);

  function handleClick() {
    Tone.start().then(() => {
      audioPlayer.start();
    });
  }

  return (
    <div className="flex">
      {/* <button onClick={handlePlay}>Play</button> */}
      {audioPlayer && (
        <>
          <button
            onClick={handleClick}
            className="w-full bg-red-400 p-2 flex items-center p-0 pr-4 rounded-xl "
          >
            <div className="scale-50">
              <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <circle fill="#00A0FF" cx="30" cy="30" r="30" />
                  <path
                    d="M43.625 29.803L23.646 17.426C22.189 16.474 21 17.173 21 18.988V43.01c0 1.812 1.188 2.518 2.646 1.562l19.979-12.375s.711-.5.711-1.197c0-.7-.711-1.198-.711-1.198z"
                    fill="#FFF"
                  />
                </g>
              </svg>
            </div>
            <p>{time}</p>
          </button>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
