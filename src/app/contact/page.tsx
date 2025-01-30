

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
      <div className="justify-center text-center my">
        <h2 className="text-5xl">Contact Us</h2>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">  
          We&apos;re here to help with any questions about our courses,
          programs, or events. Reach out and let us know how we can assist you
          in your musical journey.</p>
      </div>
      <div>
        <form action="">
          <input type="text" 
          className="block mx-auto p-2 mb-4 border border-gray-400 rounded-lg text w-[50vw] bg-black"
          placeholder="Your email"
          />
          <input type="text"
          className="block mx-auto  p-2 mb-4 border border-gray-400 rounded-lg text h-[40vh] w-[50vw] bg-black"
          placeholder="Your message"
          />
        </form>
      </div>
    </div>
  )
}

export default page