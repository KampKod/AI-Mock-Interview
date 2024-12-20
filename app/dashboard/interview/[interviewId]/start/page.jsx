"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]); // Initialized as array
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
  
      let jsonMockResp = [];
      try {
        jsonMockResp = JSON.parse(result[0].jsonMockResp);
        
        // Check if jsonMockResp is an array
        if (Array.isArray(jsonMockResp)) {
          // If it's an array, use it directly
          jsonMockResp = jsonMockResp;
        } else if (jsonMockResp.interviewQuestions && Array.isArray(jsonMockResp.interviewQuestions)) {
          // If it's not an array, but the interviewQuestions key is an array, use that instead
          jsonMockResp = jsonMockResp.interviewQuestions;
        } else {
          // If neither is an array, throw an error
          throw new Error("JSON does not contain a valid array.");
        }
      } catch (err) {
        console.error("Invalid JSON format:", err);
      }
  
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };
  
  console.log("start page mock interview",mockInterviewQuestion)
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
