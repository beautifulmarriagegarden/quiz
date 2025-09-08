export default function getFeedback(answers, otherAnswers) {
  const feedback = [];

  if (
    answers[1] === "I was emotionally excited and jumped in quickly" ||
    answers[2] === "None — I just followed my emotions"
  ) {
    feedback.push("🌀 It seems the relationship may have begun from an emotional impulse rather than spiritual clarity. Consider prioritizing prayer and reflection before future relationships.");
  }

  if (
    answers[5] === "Yes — and I ignored or excused them" ||
    (Array.isArray(answers[6]) && answers[6].length >= 3)
  ) {
    feedback.push("🚩 You recognized multiple red flags. Ignoring red flags early can lead to greater pain later. Learning to act on these signs is vital.");
  }

  if (
    answers[4] === "No — I had consistent unease but ignored it" ||
    answers[4] === "Not really — I had doubts but convinced myself it was fear"
  ) {
    feedback.push("💭 You mentioned a lack of peace. Inner peace is often God’s way of confirming or cautioning us—listen closely next time.");
  }

  if (
    answers[3] === "None — I trusted my own feelings" ||
    answers[3] === "I talked to one or two people briefly"
  ) {
    feedback.push("🗣️ Involving wise counsel earlier might have helped bring clarity. In the future, seek trusted voices early in the journey.");
  }

  if (
    answers[8] === "Emotionally dependent or idolizing the person" ||
    answers[9]?.includes("Became emotionally dependent")
  ) {
    feedback.push("🧠 Emotional dependency can cloud good judgment. Healing and growing in emotional resilience is a great next step.");
  }

  if (
    Array.isArray(answers[13]) && answers[13].includes("True love does not require me to lose myself")
  ) {
    feedback.push("🌱 It’s powerful that you've recognized the importance of maintaining your identity and calling in love.");
  }

  if (
    Array.isArray(answers[17]) && answers[17].includes("Reconnect with God on a deeper level")
  ) {
    feedback.push("🙏 Reconnecting with God is the best foundation. Use this season to rebuild with purpose and peace.");
  }

  return feedback;
}