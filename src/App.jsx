import React, { useState } from "react";
import "./App.css";
import getFeedback from "./feedback.js";

// Replace with your Apps Script Web App URL
const LEAD_ENDPOINT = "https://script.google.com/macros/s/AKfycbxQCYgKrkmzOI_oSKIkQa7esAcIaESx9e943AvR2Fthj61FtakwQL7KBcXyHxE1UEW79g/exec";

async function saveLead(name, email) {
  // Send URL-encoded form data (simple request → no preflight)
  const payload = new URLSearchParams({
    name,
    email,
    source: "Relationship Reflection Quiz",
    userAgent: navigator.userAgent
    // ip: include if you fetch one client-side
  });

  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    body: payload // IMPORTANT: no headers; let the browser set Content-Type
  });

  // Optional: read JSON response from Apps Script
  let json = {};
  try { json = await res.json(); } catch (_) {}
  if (!res.ok || json.ok === false) {
    throw new Error(json.error || `Lead save failed (status ${res.status})`);
  }
}

const questions = [
  /* questions will be inserted later */
 {
      question: "How long were you both friends before you started dating?",
      options: [
        "We were never friends. It started instantly as a romantic connection.",
        "Less than 6 months — we barely had meaningful one-on-one interactions.",
        "About 6 months to a year — we knew each other in a group setting.",
        "Over a year — we had many deep conversations and shared experiences.",
        "We were very close friends for years and knew each other deeply."
      ],
      type: "single"
    },
    {
      question: "How did the relationship begin?",
      options: [
        "I was emotionally excited and jumped in quickly.",
        "We both agreed to take it slowly, but it escalated faster than expected.",
        "It began intentionally, with prayer and conversations.",
        "I entered because I felt pressured or afraid to miss the opportunity."
      ],
      type: "single"
    },
    {
      question: "How much time did you invest into prayer and seeking God beforehand?",
      options: [
        "None — I just followed my emotions.",
        "Very little — I only prayed casually, without waiting on God.",
        "Some — I asked God for peace but rushed the process.",
        "Ample — I fasted, prayed consistently, and waited for confirmation."
      ],
      type: "single"
    },
    {
      question: "How much counsel or investigation did you seek before starting the relationship?",
      options: [
        "None — I trusted my own feelings.",
        "I talked to one or two people briefly.",
        "I asked a few friends, but not deeply.",
        "I involved mentors, spiritual leaders, and close friends intentionally."
      ],
      type: "single"
    },
    {
      question: "Did you feel inner peace before and during the relationship?",
      options: [
        "Yes — I felt calm and spiritually grounded about the relationship.",
        "No — I had consistent unease but ignored it.",
        "Not really — I had doubts but convinced myself it was fear.",
        "Peace came and went depending on how the relationship was going."
      ],
      type: "single"
    },
    {
      question: "Did you notice any red flags before or during the relationship?",
      options: [
        "Yes — and I ignored or excused them.",
        "Yes — and I confronted them but stayed anyway.",
        "No — but in hindsight, I now see them.",
        "No — the relationship ended for other reasons."
      ],
      type: "single"
    },
    {
      question: "Which red flags did you notice? (Select all that apply)",
      options: [
        "Temper issues or emotional outbursts",
        "Dishonesty or secretive behavior",
        "Spiritually disconnected — we never prayed together",
        "Manipulation or guilt-tripping",
        "Pressure to compromise on personal or spiritual values",
        "Disinterest in your goals, dreams, or calling",
        "Inconsistency — hot one day, cold the next",
        "Isolating you from friends or family",
        "Refused to introduce you to their inner circle",
        "Other"
      ],
      type: "multiple"
    },
    {
      question: "Were there signs the relationship wasn’t meant for you?",
      options: [
        "Yes — and I recognized them early.",
        "Yes — but I ignored them to avoid conflict or loneliness.",
        "Not at first, but I later saw many signs.",
        "No — it felt right most of the way through."
      ],
      type: "single"
    },
    {
      question: "How did you feel emotionally during most of the relationship?",
      options: [
        "Anxious and afraid of being abandoned",
        "Confused or emotionally unstable",
        "Happy and safe",
        "Emotionally dependent or idolizing the person",
        "Other"
      ],
      type: "single"
    },
    {
      question: "What were your own contributions to the challenges in this relationship? (Check all that apply)",
      options: [
        "Ignored warning signs",
        "Lied or hid truths to avoid conflict",
        "Didn’t set or maintain boundaries",
        "Became emotionally dependent",
        "Manipulated emotionally instead of communicating",
        "Overlooked my own relationship with God",
        "Other"
      ],
      type: "multiple"
    },
    {
      question: "At what point did you realize the relationship was going to end?",
      options: [
        "After repeated conflicts that never got resolved",
        "After discovering dishonesty or betrayal",
        "After feeling like I lost myself in the relationship",
        "After seeking counsel or praying and realizing God was saying ‘no’",
        "Other"
      ],
      type: "multiple"
    },
    {
      question: "How did the relationship end?",
      options: [
        "I ended it after a painful realization",
        "They ended it — I felt abandoned",
        "We agreed mutually but it was still difficult",
        "It ended without closure or explanation"
      ],
      type: "single"
    },
    {
      question: "What pain or fear from past relationships may have affected this one?",
      options: [
        "Fear of being alone",
        "Rejection or abandonment from childhood",
        "Unresolved trauma from previous relationships",
        "I don't know, but I think my past played a role",
        "None"
      ],
      type: "single"
    },
    {
      question: "What lessons have you learned from this relationship? (Check all that apply)",
      options: [
        "Compatibility is not the same as calling",
        "Emotional attraction is not enough",
        "Accountability and prayer are critical",
        "Peace from God is not optional",
        "Red flags don't disappear with time",
        "True love does not require me to lose myself",
        "Other"
      ],
      type: "multiple"
    },
    {
      question: "What would you do differently next time? (Select all that apply)",
      options: [
        "Pray and wait longer before saying yes",
        "Involve mentors and wise friends early",
        "Set and communicate clear boundaries",
        "Trust my gut and the Holy Spirit",
        "Take emotional healing seriously before entering a relationship",
        "Other"
      ],
      type: "multiple"
    },
    {
      question: "What does forgiveness look like in this situation? (Select all that apply)",
      options: [
        "Letting go of bitterness toward them",
        "Releasing myself from guilt or shame",
        "Praying for the person without holding offense",
        "Accepting closure and choosing to heal",
        "I’m still working through forgiveness",
        "Other"
      ],
      type: "multiple"
    },
    {
      question: "What strengths are you discovering in yourself now? (Select all that apply)",
      options: [
        "I am more self-aware",
        "I’m learning to trust God more",
        "I know how to set better boundaries",
        "I now value accountability and wise counsel",
        "I am learning to love myself in a healthy way",
        "Other"
      ],
      type: "multiple"
    },
    {
      question: "What are your next steps in healing? (Select all that apply)",
      options: [
        "Take time to be alone and rebuild",
        "Reconnect with God on a deeper level",
        "Forgive and release the past",
        "Seek therapy, counseling, or mentorship",
        "Journal, rest, and reflect",
        "Begin new healthy relationships with caution and prayer",
        "Other"
      ],
      type: "multiple"
    }
  ];

 function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(questions.map(q => q.type === "multiple" ? [] : ""));
  const [otherAnswers, setOtherAnswers] = useState(questions.map(() => ""));
  const [submitted, setSubmitted] = useState(false);

  // New: track quiz start and user info
  const [quizStarted, setQuizStarted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  const currentQuestion = questions[current];
  const isLast = current === questions.length - 1;
  const isFirst = current === 0;

  const handleAnswer = (value, isCheckbox = false) => {
    const newAnswers = [...answers];
    if (isCheckbox) {
      const currentValues = newAnswers[current] || [];
      if (currentValues.includes(value)) {
        newAnswers[current] = currentValues.filter(v => v !== value);
      } else {
        newAnswers[current] = [...currentValues, value];
      }
    } else {
      newAnswers[current] = value;
    }
    setAnswers(newAnswers);

    if (currentQuestion.type === "single" && value !== "Other") {
      setTimeout(() => {
        if (!isLast) {
          setCurrent(prev => prev + 1);
        } else {
          setSubmitted(true);
        }
      }, 300);
    }
  };

  const handleOtherChange = (text) => {
    const updated = [...otherAnswers];
    updated[current] = text;
    const updatedAnswers = [...answers];
    if (currentQuestion.type === "multiple") {
      if (!updatedAnswers[current].includes("Other")) {
        updatedAnswers[current] = [...updatedAnswers[current], "Other"];
      }
    } else {
      updatedAnswers[current] = "Other";
    }
    setOtherAnswers(updated);
    setAnswers(updatedAnswers);
  };

  const validateAndNext = () => {
    if (currentQuestion.type === "multiple") {
      if (answers[current].length === 0) {
        alert("Please select at least one option.");
        return;
      }
      if (answers[current].includes("Other") && !otherAnswers[current].trim()) {
        alert("Please specify your 'Other' answer.");
        return;
      }
    }
    if (!isLast) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
    }
  };

  const displayAnswer = (qIndex) => {
    const ans = answers[qIndex];
    const other = otherAnswers[qIndex];
    if (Array.isArray(ans)) {
      return ans.map(a => a === "Other" ? `Other: ${other}` : a).join(", ");
    } else {
      return ans === "Other" ? `Other: ${other}` : ans;
    }
  };


  const startQuiz = async () => {
  if (!name.trim() || !email.trim()) {
    setFormError("Please enter both name and email to begin.");
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    setFormError("Please enter a valid email address.");
    return;
  }
  setFormError("");
  
  setQuizStarted(true);

saveLead(name.trim(), email.trim()).catch((err) => {
    console.warn("Lead save failed:", err);
    // optional: set a non-blocking message somewhere
    // setFormError("We couldn't save your details, but you can continue.");
  });
};

  return (
    <div className="App">
      <header className="header">
        <img src="/logo-placeholder.png" alt="Logo" className="logo" />
      </header>

      {/* Start Screen */}
      {!quizStarted && !submitted && (
        <div className="start-screen">
          <h2>Welcome to the Relationship Reflection Quiz</h2>
          <p>Please enter your details to begin.</p>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {formError && <p style={{ color: "red" }}>{formError}</p>}
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      )}

      {/* Quiz Questions */}
      {quizStarted && !submitted && (
        <div className="question-container">
          {!isFirst && (
            <button className="back-btn" onClick={() => setCurrent(current - 1)}>
              ← Back
            </button>
          )}

          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="options">
            {currentQuestion.options.map((opt, i) => {
              const isOther = opt === "Other";
              const isChecked = currentQuestion.type === "multiple"
                ? answers[current].includes(opt)
                : answers[current] === opt;

              return (
                <div key={i}>
                  <label>
                    <input
                      type={currentQuestion.type === "multiple" ? "checkbox" : "radio"}
                      name={`q${current}`}
                      value={opt}
                      checked={isChecked}
                      onChange={() => handleAnswer(opt, currentQuestion.type === "multiple")}
                    />
                    {isOther ? "Other:" : opt}
                  </label>
                  {isOther && isChecked && (
                    <input
                      type="text"
                      value={otherAnswers[current]}
                      onChange={e => handleOtherChange(e.target.value)}
                      placeholder="Please specify"
                    />
                  )}
                </div>
              );
            })}

            {currentQuestion.type === "multiple" && (
              <button className="next-btn" onClick={validateAndNext}>
                {isLast ? "Submit" : "Next"}
              </button>
            )}
          </div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            ></div>
            <p className="progress-label">
              {Math.round(((current + 1) / questions.length) * 100)}% Complete
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {submitted && (
        <div className="results">
          <div className="custom-feedback">
            <h3>💡 Customized Insight Based on Your Answers</h3>
            <ul>
              {getFeedback(answers, otherAnswers).map((fb, idx) => (
                <li key={idx}>{fb}</li>
              ))}
            </ul>
          </div>

          <h2>Your Reflections:</h2>
          <ul>
            {questions.map((q, i) => (
              <li key={i}>
                <strong>{q.question}</strong>
                <br />
                Answer: {displayAnswer(i)}
              </li>
            ))}
          </ul>

          <footer className="footer">
            Powered by Beautiful Marriage Garden
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;