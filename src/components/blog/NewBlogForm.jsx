//import ListBlog, { blogs } from "./ListBlog.jsx";
import blogs from "../../content/blogs.js";

const NewBlogForm = () => {
    
    const handleSubmit = (event) => {
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const content = formData.get("content");
        const date = formData.get("date");
        const imageSrc = formData.get("imageSrc");

        const newBlog = {
            title: title,
            content: content,
            date: date,
            imageSrc: imageSrc,
        };

        blogs.push(newBlog);
    };

    return (
        <div className="border-2 border-slate-300 rounded-lg p-5 bg-slate-400">
            <div className="flex flex-row items-center justify-center gap-5">
                <label htmlFor="title" className="text-l font-bold">Título:</label>
                <input type="text" id="title" name="title" className="w-full p-3 rounded-lg border-2 border-slate-300" />
                <label htmlFor="date" className="text-l font-bold">Fecha:</label>
                <input type="date" id="date" name="date" className="w-full p-3 rounded-lg border-2 border-slate-300" />
            </div>
            <label htmlFor="imageSrc" className="text-l font-bold">Imagen:</label>
            <input type="text" id="imageSrc" name="imageSrc" className="w-full p-3 rounded-lg border-2 border-slate-300" />
            <label htmlFor="content" className="text-l font-bold">Contenido:</label>
            <textarea id="content" name="content" className="w-full p-3 rounded-lg border-2 border-slate-300 h-full"></textarea>
            <div className="flex flex-row justify-center gap-5 mt-5">
                <button onClick={handleSubmit} className="bg-green-600 text-slate-200  p-3 rounded-lg hover:bg-green-500 hover:text-white">
                    Crear
                </button>
                <a href="/blog" className="bg-red-600 text-slate-200 p-3 rounded-lg hover:bg-red-500 hover:text-white">
                    Cancelar
                </a>
            </div>
        </div>
    );
};

export default NewBlogForm;