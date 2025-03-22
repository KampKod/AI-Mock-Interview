// components/InterviewItemCard.js
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { db } from "@/utils/db";
import { UserAnswer, MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

function InterviewItemCard({ interview }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // Track whether the item has been deleted

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  const onDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      // Delete the interview from the database
      await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, interview.mockId));
      await db.delete(MockInterview).where(eq(MockInterview.mockId, interview.mockId));
      // Set the deleted state to true
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting interview:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
    }
  };

  const onDeletePress = () => {
    setShowDeleteConfirmation(true);
  };

  const onDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  // If the item is deleted, return null to render nothing
  if (isDeleted) {
    return null;
  }

  return (
    <div className="border shadow-sm rounded-lg p-3 relative">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
          <h2 className="text-sm text-gray-600">{interview?.jobExperience} Years of Experience</h2>
          <h2 className="text-xs text-gray-400">Created At: {interview.createdAt}</h2>
        </div>
        <div>
          {/* Delete button directly on the card */}
          <Button size="sm" variant="ghost" className="opacity-70 hover:opacity-100" onClick={onDeletePress}>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between mt-2 gap-5">
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>

      <Dialog open={showDeleteConfirmation} >
        <DialogContent className="bg-white rounded-lg shadow-lg p-6">
          <DialogHeader>
            {/* Updated to include the interview name */}
            <DialogTitle>Delete Interview: {interview.jobPosition}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this interview?
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={onDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InterviewItemCard;
