import Feed from "@components/Feed"

const Home = () => {
    return (
        <section className="w-full flex-center text-center flex-col ">
            <h1 className="head_text text-center">Find and Share Your Post</h1>
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> An AI-powered Promt Post</span>
            <p className="desc text-center">This is a post blog where you can easily create and find posts to be shared with others</p>

            {/* feed component */}
            <Feed />
        </section>
    )
}

export default Home

