import Feed from 'components/Feed';

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center min-h-screen">
      <h1 className="head_text text-center mt-5">
        Discover & Share
        <br />
        <span className="orange_gradient"> AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">Promptopia is an AI prompting tool for modern world to discover, create and share creative prompts.</p>
    
      <Feed />
    </section>
  )
}

export default Home