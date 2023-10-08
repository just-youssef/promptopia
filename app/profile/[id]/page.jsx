"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "components/Profile";
import LoadPage from "components/LoadPage";

const UserProfile = ({ params }) => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await fetch(`/api/users/${params?.id}/`);
      const res1Data = await res1.json();
      setUser(res1Data);

      const res2 = await fetch(`/api/users/${params?.id}/posts`);
      const res2Data = await res2.json();
      setUserPosts(res2Data);
    };

    if (params?.id) fetchData();
  }, [params.id]);

  session?.user.id === params.id && router.push('/profile')

  return (
    <>{
        !(user.username && user.image)? <LoadPage />
        :
        <Profile
          name={user.username}
          img={user.image}
          desc={`Welcome to ${user.username}'s personalized profile page. Explore ${user.username}'s exceptional prompts and be inspired by the power of their imagination`}
          data={userPosts}
        />
    }</>
  );
};

export default UserProfile;