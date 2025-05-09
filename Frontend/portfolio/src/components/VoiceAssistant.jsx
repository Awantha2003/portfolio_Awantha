import React, { useEffect, useRef, useState } from "react";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Voice Input:", transcript);
      handleCommand(transcript);
    };

    recognition.onend = () => {
      setListening(false);
      setMessage("");
    };

    recognition.onerror = (err) => {
      console.error("Speech error:", err);
      setListening(false);
      setMessage("❌ Error occurred");
    };

    recognitionRef.current = recognition;
  }, []);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synth.speak(utter);
  };

  const handleCommand = (text) => {
    const scrollTo = (id, msg) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        speak(msg);
        setMessage(msg);
      } else {
        speak(`I couldn't find the ${id} section.`);
        setMessage(`❌ Section "${id}" not found`);
      }
    };

    if (text.includes("scroll down") || text.includes("පහළට") || text.includes("கீழே")) {
      window.scrollBy({ top: 500, behavior: "smooth" });
      speak("Scrolling down");
      setMessage("⬇️ Scrolling down...");
    } else if (text.includes("scroll up") || text.includes("ඉහළට") || text.includes("மேலே")) {
      window.scrollBy({ top: -500, behavior: "smooth" });
      speak("Scrolling up");
      setMessage("⬆️ Scrolling up...");
    } else if (text.includes("contact") || text.includes("අමතන්න") || text.includes("தொடர்பு")) {
      scrollTo("contact", "Opening contact section");
    } else if (text.includes("about") || text.includes("ඔබ") || text.includes("உங்களைப் பற்றி")) {
      scrollTo("about", "Opening about section");
    } else if (text.includes("skills") || text.includes("කාර්යශීලතාව") || text.includes("திறன்கள்")) {
      scrollTo("skills", "Here are my skills");
    } else if (text.includes("projects") || text.includes("ප්‍රොජෙක්ට්ස්") || text.includes("திட்டங்கள்")) {
      scrollTo("projects", "Opening projects");
    } else if (text.includes("experience") || text.includes("අත්දැකීම්") || text.includes("அனுபவம்")) {
      scrollTo("experience", "Showing my experience");
    } else {
      speak("Sorry, I didn't understand.");
      setMessage("🤷 Sorry, I didn't understand.");
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      setListening(true);
      speak("I'm listening. Please say a section like about, contact or projects.");
      setMessage("🎤 I'm listening…");
      recognitionRef.current.start();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 text-right z-50">
      <button
        onClick={startListening}
        className={`px-5 py-3 rounded-full shadow-xl text-white ${
          listening ? "bg-red-600" : "bg-green-600"
        }`}
      >
        🎤 {listening ? "Listening..." : "Ask Assistant"}
      </button>
      {message && <p className="text-white mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default VoiceAssistant;
