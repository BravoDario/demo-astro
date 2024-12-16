import { getBlog } from "./listBlog";

const BlogDetails = ({ blogName }) => {
    const blog = getBlog(blogName);
    //obtener nombre de blog con la url 
    console.log(blog);
    return (

        <div className="mt-20">
            <h2>BLog:</h2>
            <h2>{blog?.title}</h2>
            <p>{blog?.content}</p>
        </div>

    );
};
export default BlogDetails;