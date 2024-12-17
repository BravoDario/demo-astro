import { getBlog } from "./ListBlog.jsx";

const BlogDetails = ({ blogName }) => {
    const blog = getBlog(blogName);

    return (
        <div className="px-24">
            <h2 className="text-2xl font-bold">{blog?.title}</h2>
            <h4 className="text-xl font-bold">{blog?.date}</h4>
            <div className="flex flex-row items-start justify-left">
                <div className="blog-image ">
                    <img src={blog?.imageSrc} alt={blog?.title} className="w-full rounded-md border-2   border-slate-300" />
                </div>
                <p>{blog?.content}</p>
            </div>

        </div>
    );
};

export default BlogDetails;