"use client";

import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
// import { signIn } from 'next-auth/react';

import Form from 'components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    { ...session?.user ?
    <Form
      type="Create"
      post={post} 
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
    :
    <div className='w-full flex flex-col items-center'>
      <p className="text-4xl font-semibold">You are not Signed In !</p>
      {/* <button className='black_btn w-full max-w-lg mt-5' onClick={signIn}>
        Sign In Here
      </button> */}
    </div>
  }
  )
}

export default CreatePrompt