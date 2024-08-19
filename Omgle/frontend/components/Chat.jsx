import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const [inCall, setInCall] = useState(false);

  let socket = useRef(null);
  let localStream = useRef(null);
  let remoteStream = useRef(null);
  let peerConnection = useRef(null);

  useEffect(() => {
    socket.current = io();

    socket.current.emit("joinroom");

    socket.current.on("joined", (roomname) => {
      setRoom(roomname);
      document.querySelector(".nobody").classList.add("hidden");
    });

    socket.current.on("message", (message) => {
      receiveMessage(message);
    });

    socket.current.on("signalingMessage", handleSignalingMessage);

    socket.current.on("incomingCall", () => {
      setIncomingCall(true);
    });

    socket.current.on("callAccepted", () => {
      initialize();
      document.querySelector(".videoblock").classList.remove("hidden");
    });

    socket.current.on("callRejected", () => {
      alert("Call rejected by other user");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && room) {
      socket.current.emit("message", { room, message });
      attachMessage(message);
      setMessage("");
    }
  };

  const attachMessage = (message) => {
    const userMessageContainer = document.createElement("div");
    userMessageContainer.classList.add("flex", "my-2", "justify-end");

    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add(
      "bg-blue-500",
      "text-white",
      "p-3",
      "rounded-lg",
      "max-w-xs"
    );

    const userMessageText = document.createElement("p");
    userMessageText.textContent = message;

    userMessageDiv.appendChild(userMessageText);
    userMessageContainer.appendChild(userMessageDiv);
    messageContainerRef.current.appendChild(userMessageContainer);
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  };

  const receiveMessage = (message) => {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("flex", "my-2", "justify-start");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(
      "bg-gray-300",
      "text-gray-800",
      "p-3",
      "rounded-lg",
      "max-w-xs"
    );

    const messageText = document.createElement("p");
    messageText.textContent = message;

    messageDiv.appendChild(messageText);
    messageContainer.appendChild(messageDiv);
    messageContainerRef.current.appendChild(messageContainer);
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  };

  const initialize = async () => {
    try {
      localStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localVideoRef.current.srcObject = localStream.current;
      localVideoRef.current.style.display = "block";
      initiateOffer();
      setInCall(true);
    } catch (err) {
      console.log("Rejected by browser", err);
    }
  };

  const initiateOffer = async () => {
    await createPeerConnection();
    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.current.emit("signalingMessage", {
        room,
        message: JSON.stringify({
          type: "offer",
          offer,
        }),
      });
    } catch (err) {
      console.log("error in creating offer", err);
    }
  };

  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    remoteStream.current = new MediaStream();
    remoteVideoRef.current.srcObject = remoteStream.current;
    remoteVideoRef.current.style.display = "block";
    localVideoRef.current.classList.add("smallFrame");

    localStream.current.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current);
    });

    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.addTrack(track);
      });
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending Ice Candidates");
        socket.current.emit("signalingMessage", {
          room,
          message: JSON.stringify({
            type: "candidate",
            candidate: event.candidate,
          }),
        });
      }
    };

    peerConnection.current.onconnectionstatechange = () => {
      console.log(
        "connection state change",
        peerConnection.current.connectionState
      );
    };
  };

  const handleSignalingMessage = async (message) => {
    const { type, offer, answer, candidate } = JSON.parse(message);
    if (type === "offer") handleOffer(offer);
    if (type === "answer") handleAnswer(answer);
    if (type === "candidate" && peerConnection.current) {
      try {
        await peerConnection.current.addIceCandidate(candidate);
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "hangup") {
      hangup();
    }
  };

  const handleOffer = async (offer) => {
    await createPeerConnection();
    try {
      await peerConnection.current.setRemoteDescription(offer);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit("signalingMessage", {
        room,
        message: JSON.stringify({
          type: "answer",
          answer,
        }),
      });
      setInCall(true);
    } catch (error) {
      console.log("failed to handle offer");
    }
  };

  const handleAnswer = async (answer) => {
    try {
      await peerConnection.current.setRemoteDescription(answer);
    } catch (error) {
      console.log("failed to handle answer");
    }
  };

  const hangup = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
      localStream.current.getTracks().forEach((track) => track.stop());
      document.querySelector(".videoblock").classList.add("hidden");
      socket.current.emit("signalingMessage", {
        room,
        message: JSON.stringify({ type: "hangup" }),
      });
      setInCall(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <header className="p-4 bg-blue-600 text-white">Chat Application</header>
      <div className="fixed videoblock hidden z-50 w-full h-screen">
        <div id="videos" className="h-full grid grid-cols-1">
          <video
            ref={localVideoRef}
            className="video-player"
            id="localVideo"
            autoPlay
            muted
            playsInline
          ></video>
          <video
            ref={remoteVideoRef}
            className="video-player"
            id="remoteVideo"
            autoPlay
            playsInline
          ></video>
        </div>
        <div
          id="controls"
          className="flex gap-4 fixed bottom-5 left-1/2 transform -translate-x-1/2"
        >
          <div id="cameraButton" className="control-container">
            <svg
              width="21"
              height="14"
              viewBox="0 0 21 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.525 2.149C20.365 2.05 20.183 2 20 2C19.847 2 19.694 2.035 19.553 2.105L17 3.382V3C17 1.346 15.654 0 14 0H3C1.346 0 0 1.346 0 3V11C0 12.654 1.346 14 3 14H14C15.654 14 17 12.654 17 11V10.618L19.553 11.894C19.694 11.965 19.847 12 20 12C20.183 12 20.365 11.95 20.525 11.851C20.82 11.668 21 11.347 21 11V3C21 2.653 20.82 2.332 20.525 2.149ZM5 8.5C4.171 8.5 3.5 7.829 3.5 7C3.5 6.171 4.171 5.5 5 5.5C5.829 5.5 6.5 6.171 6.5 7C6.5 7.829 5.829 8.5 5 8.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div id="endButton" onClick={hangup} className="control-container">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.8327 7.39259C14.8393 5.24782 12.9932 3.56358 10.7208 2.69455C9.68052 2.2772 8.56479 2.05603 7.4485 2.05603C6.33221 2.05603 5.21648 2.2772 4.17621 2.69455C1.90374 3.56358 0.0577077 5.24782 -0.935733 7.39259C-1.09826 7.7453 -0.968354 8.16347 -0.652317 8.37783L1.27503 9.6215C1.52291 9.78633 1.84172 9.77763 2.07946 9.5992C3.14047 8.81977 4.4032 8.41115 5.69856 8.41115C6.99393 8.41115 8.25665 8.81977 9.31767 9.5992C9.5554 9.77763 9.87421 9.78633 10.1221 9.6215L12.0489 8.37783C12.3649 8.16347 12.4948 7.7453 12.3322 7.39259Z"
                fill="white"
              />
            </svg>
          </div>
          <div id="micButton" className="control-container">
            <svg
              width="13"
              height="20"
              viewBox="0 0 13 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 13C7.88135 13 9 11.8807 9 10.5V2.5C9 1.11929 7.88135 0 6.5 0C5.11865 0 4 1.11929 4 2.5V10.5C4 11.8807 5.11865 13 6.5 13Z"
                fill="white"
              />
              <path
                d="M12.4167 8.5C12.4167 11.65 9.65 14.4167 6.5 14.4167C3.35 14.4167 0.583344 11.65 0.583344 8.5H0C0 12.004 2.70394 14.7912 6.08334 15.1727V19.1667H6.91667V15.1727C10.2961 14.7912 13 12.004 13 8.5H12.4167Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1 overflow-y-auto p-4 nobody">
          <p className="text-gray-500">Waiting for other users...</p>
        </div>
        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto p-4 messageContainer"
        ></div>
        <div className="bg-white p-4 border-t">
          <form onSubmit={sendMessage} className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              placeholder="Type a message"
            />
            <button
              type="submit"
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
