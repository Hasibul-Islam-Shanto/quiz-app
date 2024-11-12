export const calculateScores = (correctAnswers, submittedAnswers) => {
  let correctCount = 0;
  let wrongCount = 0;
  let totalMarks = 0;
  const correctAnswersMap = correctAnswers?.reduce(
    (acc, { question_id, answer, marks }) => {
      acc[question_id] = { answer, marks };
      return acc;
    },
    {}
  );

  submittedAnswers?.forEach(({ question_id, answer }) => {
    if (correctAnswersMap[question_id].answer === answer) {
      correctCount++;
      totalMarks += correctAnswersMap[question_id].marks;
    } else {
      wrongCount++;
    }
  });

  return { correctCount, wrongCount, totalMarks };
};
