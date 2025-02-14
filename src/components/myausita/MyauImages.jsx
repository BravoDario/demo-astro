import { useEffect, useState } from 'react';
import ImagesCarrousel from "./ImagesCarrousel.jsx";
//importar ícono close de font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const MyauImages = ({ }) => {
    const token = localStorage.getItem("token");
    console.log(token);
    const [isLogin, setIsLogin] = useState(token ? true : false);
    const [img, setImg] = useState(null);

    useEffect(() => {
        setIsLogin(token ? true : false);
        !isLogin ? window.location.href = "/" : '';
    }, [token]);

    const handleOpenModal = (img) => {
        setImg(img);
    }

    const handleCLoseModal = () => {
        setImg(null);
    }

    return isLogin ?
        <div className='relative'>
            <section
                class="bg-gradient-to-r from-purple-500 to-pink-500 text-white h-full -mt-5 pt-12"
            >
                <h2 class="text-3xl text-center font-bold uppercase mb-2 font-sans">
                Myau Page ;3
                </h2>
                <div class="w-2/3 mx-auto bg-slate-200 p-8 rounded-md">
                    <ImagesCarrousel handleCLoseModal={handleCLoseModal} handleOpenModal={handleOpenModal} client:only="react" />
                </div>
            </section>
            {
                img ?
                    <div className='absolute top-0 left-0 w-full h-full m-auto z-20 bg-black bg-opacity-50 flex justify-center items-center'>
                        <div className='relative w-1/2 bg-white h-fit rounded-md p-4 flex flex-row justify-center items-start'>
                            <button
                                className='absolute top-2 right-2 p-2 bg-red-500 text-white rounded-md'
                                onClick={handleCLoseModal}
                            >
                                <FontAwesomeIcon icon={faCoffee} />
                            </button>
                            <div className="w-80 h-80 filter grayscale blur-md">
                                <img src={img.src} className='w-full h-full filter grayscale blur-md' alt="" />
                            </div>
                            <div className='w-2/3 h-fit align-top '>
                                <h2 className='text-center font-bold uppercase'>{img.title}</h2>
                                <p>
                                    {img.description}
                                </p>
                            </div>
                        </div>
                    </div> : ''
            }
        </div>
        : '';
}

export default MyauImages;