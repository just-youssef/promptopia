import Link from "next/link";


const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient text-4xl">{type} Post</span>
      </h1>
      
      <p className="desc text-let max-w-md">
      {type} and share amazing prompts with the world,
      and let your imagination run wild with any
      AI-Powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="my-10 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
      >
        <div className="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </div>
        
        <div className="">
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </div>

        <div className='flex-end mx-3 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
        
      </form>

    </section>
  )
}

export default Form