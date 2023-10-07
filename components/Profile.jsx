import PromptCard from "./PromptCard";
import Image from "next/image";

const Profile = ({ name, img, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <div className='flex items-center head_text'>
        <Image
          src={img}
          alt='user_image'
          width={100}
          height={100}
          className='rounded-full object-contain border-gray-300 border-2'
        />
        <span className='ml-4 blue_gradient text-3xl'>{name}</span>
      </div>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;