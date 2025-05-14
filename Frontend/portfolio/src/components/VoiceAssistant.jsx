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
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log("🎙 Voice Input:", transcript);
      handleCommand(transcript);
    };

    recognition.onend = () => {
      console.log("🎤 Recognition ended");
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      setListening(false);
      speak(`Speech recognition error: ${event.error}`);
      setMessage(`❌ Speech error: ${event.error}`);
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
    console.log("⚡ Handling command:", text);

    const scrollTo = (id, msg) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        speak(msg);
        setMessage(` ${msg}`);
      } else {
        speak(`I couldn't find the ${id} section.`);
        setMessage(` Section "${id}" not found`);
      }
    };

    const commandMap = [
      { pattern: /(scroll down|පහළට|கீழே)/i, action: () => {
          window.scrollBy({ top: 500, behavior: "smooth" });
          speak("Scrolling down");
          setMessage("⬇️ Scrolling down...");
      }},
      { pattern: /(scroll up|ඉහළට|மேலே)/i, action: () => {
          window.scrollBy({ top: -500, behavior: "smooth" });
          speak("Scrolling up");
          setMessage("⬆️ Scrolling up...");
      }},
      { pattern: /(contact|අමතන්න|தொடர்பு)/i, action: () => scrollTo("contact", "Opening contact section") },
      { pattern: /(about|ඔබ|உங்களைப் பற்றி)/i, action: () => scrollTo("about", "Opening about section") },
      { pattern: /(skills|කාර්යශීලතාව|திறன்கள்)/i, action: () => scrollTo("skills", "Opening  skills") },
      { pattern: /(projects|ප්‍රොජෙක්ට්ස්|திட்டங்கள்)/i, action: () => scrollTo("projects", "Opening projects") },
      { pattern: /(experience|අත්දැකීම්|அனுபவம்)/i, action: () => scrollTo("experience", "Showing  experience") },
    ];

    const matched = commandMap.find((cmd) => cmd.pattern.test(text));

    if (matched) {
      matched.action();
    } else {
      speak("Sorry, I didn't understand. You can say things like 'about', 'contact' or 'projects'.");
      setMessage(`🤷 Sorry, I didn't understand: "${text}"`);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      if (listening) {
        recognitionRef.current.abort();
        console.log("⛔ Restarting recognition");
      }
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
