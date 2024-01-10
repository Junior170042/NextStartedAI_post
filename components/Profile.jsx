import PostCard from "./PostCard";


const Profile = ({ name, description, data, handleEdit, handleDelete }) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left"><span className="blue_gradient capitalize">{name} profile</span></h1>
            <p className="desc text-left">{description}</p>

            <div className="mt-16 prompt_layout">
                {data.map(post => <PostCard
                    key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                />)}
            </div>
        </section>
    );
}

export default Profile;
