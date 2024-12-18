import blogs from "../../content/blogs";

export const blogsEnabled = blogs.map((blog) => {
    return {
        params: {
            blog: blog.title,
        },
        props: {
            blog
        }
    };
});

export const getBlog = (title) => {
    return blogs.find((blog) => blog.title === title);
};

const ListBlog = () => {

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-14">
            {blogs ? blogs.map((blog) => (
                <a href={"/blog/" + blog.title} key={blog.title} className="w-11/12 bg-slate-400 rounded-lg p-4 hover:bg-slate-300 hover:rounded-xl hover:scale-105 transition-all duration-300">
                    <h2 className="text-2xl font-bold">{blog.title}</h2>
                    <p className="text-sm">Realizado el: {blog.date}</p>
                    <p>{blog.content.substring(0, 100) + "..."}</p>
                </a>
            )) : ''}
        </div>
    );
};

export default ListBlog;