import { useEffect, useState } from "react";

const Welcome = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const [isLogin, setIsLogin] = useState(token ? true : false);

    useEffect(() => {
        setIsLogin(token ? true : false);
    }, [token]);

    return (
        <div className="welcome">
            <div className="welcome-content">
                <div className="welcome-title">
                    <h1>Darío Bravo</h1>
                    <p>{isLogin ? "Myau Page" : "Desarrollador de software"}</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <a
                        href="/blog"
                        className="button bg-slate-900 text-gray-300 rounded px-5 py-2 hover:bg-slate-700 hover:text-gray-100 h-20 flex align-middle justify-center"
                    >
                        <div className="w-10 text-center">
                            {/* <Fragment set:html={fileIcon.html} /> */}
                            Blog
                        </div>
                    </a>
                    <a
                        href="/cv"
                        className="button bg-slate-900 text-gray-300 rounded px-5 py-2 hover:bg-slate-700 hover:text-gray-100 h-20 flex align-middle justify-center"
                    >
                        <div className="w-10 text-center">
                            {/* <Fragment set:html={userIcon.html} /> */}
                            CV
                        </div>
                    </a>
                    {isLogin ? (
                        <a
                            href="/myausita"
                            className="button bg-slate-900 text-gray-300 rounded px-5 py-2 hover:bg-slate-700 hover:text-gray-100 h-20 flex align-middle justify-center"
                        >
                            <div className="w-10 text-center">
                                {/* <Fragment set:html={userIcon.html} /> */}
                                myausita ;3
                            </div>
                        </a>
                    ) : (
                        <a
                            href="/login"
                            className="button bg-slate-900 text-gray-300 rounded px-5 py-2 hover:bg-slate-700 hover:text-gray-100 h-20 flex align-middle justify-center"
                        >
                            <div className="w-10 text-center">
                                {/* <Fragment set:html={userIcon.html} /> */}
                                Iniciar sesión
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
