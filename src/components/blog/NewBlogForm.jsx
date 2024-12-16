const NewBlogForm = () => {
    const handleCancelar = () => {
        
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <a href="/blog">Cancelar</a>
            <h1>Crear un nuevo blog</h1>
            <form>
                <label htmlFor="title">Título:</label>
                <input type="text" id="title" name="title" />
                <label htmlFor="content">Contenido:</label>
                <textarea id="content" name="content"></textarea>
                <label htmlFor="date">Fecha:</label>
                <input type="date" id="date" name="date" />
                <label htmlFor="imageSrc">Imagen:</label>
                <input type="file" id="imageSrc" name="imageSrc" />
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default NewBlogForm;