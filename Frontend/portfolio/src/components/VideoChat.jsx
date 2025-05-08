import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');
const ringtone = new Audio('/ringtone.mp3');
ringtone.loop = true;

const VideoRoom = ({ role = 'customer' }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [joined, setJoined] = useState(false);
  const [showIncomingModal, setShowIncomingModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const isRinging = useRef(false); // Track ringtone state

  const servers = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };

  // 🔔 Start full call (used by admin and customer)
  const startCall = async (sendOffer = true) => {
    if (peerConnection.current) peerConnection.current.close();

    peerConnection.current = new RTCPeerConnection(servers);

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) socket.emit('ice-candidate', event.candidate);
    };

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, stream);
    });

    localVideoRef.current.srcObject = stream;

    if (sendOffer) {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit('offer', offer);
    }

    setJoined(true);
    setNotification({ type: 'success', message: 'Call started! Connecting...' });
  };

  const requestCall = () => {
    socket.emit('call-request');
    setNotification({ type: 'info', message: '📞 Calling admin...' });
  };

  const handleOffer = async (offer) => {
    await startCall(false); // Start call but don't send offer (customer side)
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.emit('answer', answer);
  };

  const endCall = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) peerConnection.current.close();

    ringtone.pause();
    ringtone.currentTime = 0;
    isRinging.current = false;

    setJoined(false);
    setShowIncomingModal(false);
    setNotification({ type: 'info', message: 'Call ended.' });
  };

  const stopRingtone = () => {
    if (isRinging.current) {
      ringtone.pause();
      ringtone.currentTime = 0;
      isRinging.current = false;
    }
    // Ensure audio context is fully reset
    ringtone.src = ringtone.src; // Reset audio element
  };

  useEffect(() => {
    socket.on('call-request', () => {
      if (role === 'admin' && !isRinging.current) {
        ringtone.play().catch((err) => console.warn('🔇 Audio play blocked:', err));
        isRinging.current = true;
        setShowIncomingModal(true);
        setNotification({ type: 'info', message: 'Incoming call!' });
      }
    });

    socket.on('offer', (offer) => {
      if (role === 'customer') handleOffer(offer);
    });

    socket.on('answer', async (answer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
      setNotification({ type: 'success', message: 'Call connected!' });
    });

    socket.on('ice-candidate', async (candidate) => {
      if (candidate) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (peerConnection.current) peerConnection.current.close();

      stopRingtone();
      socket.off('call-request');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
    };
  }, [role]);

  // Helper to clear notification after a delay
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

      <h2 className="text-3xl font-extrabold mb-6 animate-pulse tracking-tight">
        🎥 Video Call Room ({role})
      </h2>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-xl shadow-2xl text-white font-medium animate-slide-in z-50 ${
            notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-700' : 'bg-gradient-to-r from-blue-500 to-blue-700'
          }`}
        >
          {notification.message}
        </div>
      )}

      {!joined && role === 'customer' && (
        <button
          onClick={requestCall}
          className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Request Video Call
        </button>
      )}

      {joined && (
        <div className="text-center mt-6">
          <button
            onClick={endCall}
            className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-3 rounded-full text-lg font-semibold hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            ❌ End Call
          </button>
        </div>
      )}

      {/* Admin incoming modal */}
      {showIncomingModal && role === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-100 to-gray-300 p-8 rounded-2xl shadow-2xl text-black text-center w-96 animate-fade-in">
            <h3 className="text-xl font-bold mb-6">📞 Incoming Video Call</h3>
            <div className="flex justify-center space-x-6">
              <button
                onClick={async () => {
                  stopRingtone();
                  setShowIncomingModal(false);
                  await startCall(true); // Admin sends offer
                }}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                ✅ Accept
              </button>
              <button
                onClick={() => {
                  stopRingtone();
                  setShowIncomingModal(false);
                }}
                className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                ❌ Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative group">
          <h3 className="text-lg font-semibold mb-3">You</h3>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="rounded-2xl w-full border-2 border-indigo-500 shadow-xl group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
            You
          </div>
        </div>
        <div className="relative group">
          <h3 className="text-lg font-semibold mb-3">Partner</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="rounded-2xl w-full border-2 border-purple-500 shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
            Partner
          </div>
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoRoom;