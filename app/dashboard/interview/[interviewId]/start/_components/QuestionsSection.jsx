import { Lightbulb, Volume2, VolumeX } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
  const [isMuted, setIsMuted] = useState(false); // Track mute state
  const [speech, setSpeech] = useState(null); // Store the current speech instance
  const [isSpeeching, setIsSpeeching] = useState(false); // Track if speech is currently in progress

  // Function to start speech for the question text
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      // If muted, return without speaking
      if (isMuted) {
        return;
      }

      // Cancel any ongoing speech before starting a new one
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }

      const newSpeech = new SpeechSynthesisUtterance(text);
      newSpeech.onstart = () => setIsSpeeching(true);
      newSpeech.onend = () => setIsSpeeching(false);
      speechSynthesis.speak(newSpeech);
      setSpeech(newSpeech); // Store the new speech instance
    } else {
      alert('Sorry, Your browser does not support text to speech');
    }
  };

  // Stop speech when the active question index changes
  useEffect(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }, [activeQuestionIndex]);

  // Handle mute/unmute toggle
  const handleMuteToggle = () => {
    // Cancel any ongoing speech immediately
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setIsMuted((prev) => !prev); // Toggle mute state
  };

  // Handle volume icon click
  const handleVolumeClick = () => {
    if (!isSpeeching) {
      textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question || "");
    } else {
      speechSynthesis.cancel();
    }
  };

  return (
    <div className="p-5 border rounded-lg my-10">
      {/* Question Navigation Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index} // Unique key for each question
            className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index ? "bg-primary text-white" : "bg-gray-200 cursor-not-allowed"
            }`}
            onClick={() => setActiveQuestionIndex(index)}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Active Question Display */}
      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeQuestionIndex]?.question || "No question available"}
      </h2>

      {/* Text-to-Speech Trigger */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleVolumeClick}>
        {/* Mute/Unmute Icon */}
        {isMuted ? (
          <VolumeX
            className="text-red-500"
            onClick={handleMuteToggle} // Unmute when clicked
          />
        ) : (
          <Volume2
            className={`${isSpeeching ? 'text-primary' : 'text-black-300'}`}
          />
        )}
      </div>

      {/* Note Section */}
      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || "Follow the instructions carefully!"}
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
