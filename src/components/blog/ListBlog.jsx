const blog = {
    title: "",
    content: "",
    date: "",
    imageSrc: ""
}

export const blogs = [
    {
        "title": "Primer Título",
        "content": "Este es el contenido del primer objeto.",
        "date": "2024-12-16",
        "imageSrc": "https://example.com/image1.jpg"
    },
    {
        "title": "Segundo Título",
        "content": "Este es el contenido del segundo objeto.",
        "date": "2024-12-16",
        "imageSrc": "https://example.com/image2.jpg"
    },
    {
        "title": "Tercer Título",
        "content": "Este es el contenido del tercer objeto.",
        "date": "2024-12-16",
        "imageSrc": "https://example.com/image3.jpg"
    }
];

export const blogsEnabled = blogs.map((blog) => {
    return {
        params: {
            blog: blog.title,
        },
    };
});

export const getBlog = (title) => {
    return blogs.find((blog) => blog.title === title);
};

//componente de react para obtener los blogs
const ListBlog = () => {

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Listado de blogs</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {blogs ? blogs.map((blog) => (
                    <a href={"/blog/" + blog.title} key={blog.title} className="bg-slate-400 rounded-lg p-4">
                        <h2 className="text-2xl font-bold">{blog.title}</h2>
                        <p>{blog.content}</p>
                        <p>{blog.date}</p>
                       {/*  <img src={blog.imageSrc} alt="blog" /> */}
                    </a>
                )) : ''}
            </div>
        </div>
    );
};

export default ListBlog;