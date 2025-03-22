"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `
            Job position: ${jobPosition}, 
            Job Description: ${jobDesc}, 
            Years of Experience: ${jobExperience}

            Please generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in the following EXACT JSON format:

            [
            {
                "question": "Sample interview question text",
                "answer": "Detailed answer to the interview question"
            },
            // More question-answer objects...
            ]

            Guidelines:
            - Use lowercase keys "question" and "answer"
            - Ensure the response is a valid JSON array
            - Tailor questions to the job position, description, and experience level
            - Provide comprehensive, professional answers
            - Do not include any markdown or code block formatting
            - Return ONLY the raw JSON array
        `;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = result.response.text().trim();

            // Validate JSON
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(MockJsonResp);

                // Ensure it's an array
                if (!Array.isArray(parsedResponse)) {
                    throw new Error('Response is not a valid JSON array');
                }
            } catch (parseError) {
                console.error('JSON Parsing Error:', parseError);
                alert('There was an error generating interview questions. Please try again.');
                setLoading(false);
                return;
            }

            setJsonResponse(parsedResponse); // Store as array

            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: JSON.stringify(parsedResponse),
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID:", resp);
            if (resp) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId);
            }
        } catch (error) {
            console.error('Interview Generation Error:', error);
            alert('There was an error generating interview inputs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary
            hover:scale-105 hover:shadow-md cursor-pointer
            transition-all border-dashed'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                    </DialogHeader>
                    <div className="pb-4"> {/* New div to wrap the content */}
                        <DialogDescription>
                            Add Details about your job position/role, Job description and years of experience
                        </DialogDescription>
                        <form onSubmit={onSubmit}>
                            <div>
                                <div className='mt-7 my-3'>
                                    <label>Job Role/Job Position</label>
                                    <Input placeholder="Ex. Full Stack Developer" required
                                        onChange={(event) => setJobPosition(event.target.value)}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label>Job Description/ Tech Stack (In Short)</label>
                                    <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" 
                                        required
                                        onChange={(event) => setJobDesc(event.target.value)} 
                                    />
                                </div>
                                <div className='my-3'>
                                    <label>Years of experience</label>
                                    <Input placeholder="Ex. 5" type="number" max="100" 
                                        required
                                        onChange={(event) => setJobExperience(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex gap-5 justify-end'>
                                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ?
                                        <>
                                            <LoaderCircle className='animate-spin' /> Generating from AI
                                        </> : 'Start Interview'
                                    }
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
