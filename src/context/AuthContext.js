// Импорт необходимых библиотек и компонентов из React и других модулей
import { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

// Создание контекста для управления аутентификацией
const AuthContext = createContext();

export default AuthContext;

// Компонент, предоставляющий аутентификационные данные дочерним компонентам
export const AuthProvider = ({ children }) => {
    // Состояния для хранения токенов, информации о пользователе и состояния загрузки
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);
    // // Состояния для хранения токенов, информации о пользователе и состояния загрузки
    // let [authTokens, setAuthTokens] = useState(() => JSON.parse(localStorage.getItem('authTokens')) || null);
    // let [user, setUser] = useState(() => authTokens ? jwt_decode(authTokens.access) : null);
    
    // Получение объекта history из react-router для перенаправления пользователя
    const history = useNavigate();

    // Функция для входа пользователя
    let loginUser = async (e) => {
        e.preventDefault();
        // Отправка POST-запроса на сервер для аутентификации
        let response = await fetch(`${process.env.REACT_APP_URL}/user/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        });
        // Обработка ответа от сервера
        let data = await response.json();

        if (response.status === 200) {
            // Успешная аутентификация: обновление состояний и перенаправление на главную страницу
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            history("/");
        } else {
            // Если аутентификация не удалась, вывод сообщения об ошибке
            alert('Something went wrong!');
        }
    }

    // Функция для выхода пользователя
    let logoutUser = () => {
        // Очистка состояний и данных из localStorage, затем перенаправление на страницу входа
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        history('/login');
    }


    // useEffect(() => {
    //     const storedTokens = localStorage.getItem('authTokens');
    //     if (storedTokens) {
    //         const parsedTokens = JSON.parse(storedTokens);
    //         setAuthTokens(parsedTokens);
    //     }
    // }, []);

    // Функция для обновления токена
    let updateToken = async () => {
        // Отправка POST-запроса для обновления токена
        let response = await fetch(`${process.env.REACT_APP_URL}/user/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        });
        // Обработка ответа от сервера
        let data = await response.json();

        if (response.status === 200) {
            // Успешное обновление токена: обновление состояний и данных в localStorage
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            // Если обновление токена не удалось, вызываем функцию выхода
            logoutUser();
        }

        if (loading) {
            // Если приложение находилось в состоянии загрузки, завершаем его
            setLoading(false);
        }
    }

    // Создание объекта контекста, который предоставляет информацию о пользователе и функции для управления аутентификацией
    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }
    

    useEffect(() => {
        const updateTokenIfNeeded = () => {
            // Проверяем, есть ли токен в локальном хранилище
            const storedToken = localStorage.getItem('authToken');

            // Проверяем, когда последний раз был обновлен токен
            const lastUpdateTimestamp = localStorage.getItem('tokenLastUpdated');
            const currentTime = new Date().getTime();

            // Проверяем, если токен не был обновлен в течение, например, 4 минут
            const shouldUpdateToken = !lastUpdateTimestamp || currentTime - parseInt(lastUpdateTimestamp, 10) > 1000 * 60 * 4;

            if (!storedToken || shouldUpdateToken) {
                // Если токена нет или он устарел, вызываем функцию обновления токена
                updateToken();

                // Обновляем время последнего обновления токена в локальном хранилище
                localStorage.setItem('tokenLastUpdated', currentTime.toString());
            }
        };

        // Вызываем функцию обновления токена только при первой загрузке компонента
        if (loading) {
            updateTokenIfNeeded();
        }

        // Устанавливаем интервал для периодического обновления токена
        let interval = setInterval(() => {
            updateTokenIfNeeded();
        }, 1000 * 60 * 4); // Интервал в 4 минуты

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(interval);

    }, [authTokens, loading, updateToken]);


    // useEffect(() => {
    //     const updateTokenIfNeeded = () => {
    //         // Проверяем, есть ли токен в локальном хранилище
    //         const storedToken = localStorage.getItem('authToken');
    
    //         // Проверяем, когда последний раз был обновлен токен
    //         const lastUpdateTimestamp = localStorage.getItem('tokenLastUpdated');
    //         const currentTime = new Date().getTime();
    
    //         // Проверяем, если токен не был обновлен в течение, например, 4 минут
    //         const shouldUpdateToken = !lastUpdateTimestamp || currentTime - parseInt(lastUpdateTimestamp, 10) > 1000 * 60 * 4;
    
    //         if (!storedToken || shouldUpdateToken) {
    //             // Если токена нет или он устарел, вызываем функцию обновления токена
    //             updateToken();
    
    //             // Обновляем время последнего обновления токена в локальном хранилище
    //             localStorage.setItem('tokenLastUpdated', currentTime.toString());
    //         }
    //     };
    
    //     // Вызываем функцию обновления токена только при первой загрузке компонента
    //     if (loading) {
    //         updateTokenIfNeeded();
    //     }
    
    //     let fourMinutes = 1000 * 60 * 4; // Исправлено значение интервала на 4 минуты
    
    //     // Устанавливаем интервал для периодического обновления токена
    //     let interval = setInterval(() => {
    //         updateTokenIfNeeded();
    //     }, fourMinutes);
    
    //     // Очистка интервала при размонтировании компонента
    //     return () => clearInterval(interval);
    
    // }, [loading]);
    

    
    // Используем useEffect для автоматического обновления токена
    // useEffect(() => {
    //     // if (loading) {
    //     //     // Вызываем функцию обновления токена при загрузке компонента
    //     //     updateToken();
    //     // }

    //     let fourMinutes = 1000 * 60 * 10000000000;

    //     // Устанавливаем интервал для периодического обновления токена
    //     let interval = setInterval(() => {
    //         if (authTokens) {
    //             // Если есть действительный токен, обновляем его
    //             updateToken();
    //         }
    //     }, fourMinutes);

    //     // Очистка интервала при размонтировании компонента
    //     return () => clearInterval(interval);

    // }, [authTokens, loading]);
    

    // Возвращаем провайдер контекста, но рендерим дочерние компоненты только после загрузки данных
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
