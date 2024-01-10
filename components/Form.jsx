
import Link from "next/link";
const Form = ({ type, isSubmit, data, setPost, handleSubmit }) => {
    return (
        <section className="w-full max-w-full flex-col flex-start">
            <h1 className="head_text text-left capitalize">
                <span className="blue_gradient">
                    {type} post
                </span>
            </h1>

            <p className="desc text-left max-w-md"> {type} and share your amazing post with the entire world! Your imagination is the limit of your thought!</p>

            <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}
            >
                <label >
                    <span className="text-base text-gray-700 font-semibold font-satoshi"> Your Amazing Post</span>
                    <textarea value={data.post} onChange={(e) => setPost({
                        ...data,
                        post: e.target.value
                    })} placeholder="Write your creative post" required className="form_textarea">

                    </textarea>
                </label>
                <label >
                    <span className="text-base text-gray-700 font-semibold font-satoshi">
                        Tag {' '} <span className="text-normal">(#product, #music, #programming, #idea)</span>
                    </span>
                    <input value={data.tag} onChange={(e) => setPost({
                        ...data,
                        tag: e.target.value
                    })} placeholder="#tag" required className="form_input">

                    </input>
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">Cancel</Link>

                    <button className="px-5 py-1.5 text-sm bg-[#f27633] rounded-full text-white" type="submits" disabled={isSubmit}>
                        {isSubmit ? `${type} ...` : `${type} post`}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Form;
