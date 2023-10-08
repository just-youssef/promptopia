"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from 'components/Profile';
import LoadPage from 'components/LoadPage';


const UserProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async () => {
          const res = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await res.json();
          setPosts(data);
        }
        // console.log(posts);
        session?.user.id && fetchPosts();
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
          );
      
          if (hasConfirmed) {
            try {
              await fetch(`/api/prompt/${post._id.toString()}`, {
                method: "DELETE",
              });
      
              const filteredPosts = posts.filter((item) => item._id !== post._id);
      
              setPosts(filteredPosts);
            } catch (error) {
              console.log(error);
            }
          }
    }
    return (
      <>{
          session?.user ?
          !(session?.user.name && session?.user.image)? <LoadPage />
          :
          <Profile
            name={session?.user.name}
            img={session?.user.image}
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          :
          <div className='w-full flex flex-col items-center'>
            <p className="text-4xl font-semibold">You are not Signed In !</p>
          </div>
        }</>
    )
}

export default UserProfile