import React, { useEffect, useState } from 'react';
import './Login.css';
import styled from 'styled-components';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
    background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	margin: -20px 0 50px;
    box-sizing: border-box;

h1 {
	font-weight: bold;
	margin: 0;
}


p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #FF4B2B;
	background-color: #FF4B2B;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}
    .container {
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}
    @media (max-width: 768px) {
        height: 70%

        .container {
            width: 90%;
        }

        form {
            padding: 0 30px;
        }

        button {
            padding: 12px 35px;
        }
    }

    @media (max-width: 480px) {
        height: 40%
        .container {
            width: 100%;
            min-height: 100%;
            box-shadow: none;
            border-radius: 0;
        }

        form {
            padding: 0 20px;
        }

        h1 {
            font-size: 24px;
        }

        p, span, a, button {
            font-size: 12px;
        }

        button {
            padding: 10px 30px;
        }
    }
`;
const Login = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://66c5b873134eb8f4349556fb.mockapi.io/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } else {
            alert("Invalid username or password");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // Kiểm tra nếu username hoặc password rỗng
        if (!newUsername || !newPassword) {
            alert("Username and password cannot be empty.");
            return;
        }

        // Kiểm tra xem tên người dùng có tồn tại hay không
        const userExists = users.some(u => u.username === newUsername);

        if (userExists) {
            alert("Username already exists. Please choose a different username.");
        } else {
            const newUser = {
                username: newUsername,
                password: newPassword,
                role: "intern"
            };

            // Gửi yêu cầu POST để thêm người dùng mới
            fetch('https://66c5b873134eb8f4349556fb.mockapi.io/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then(response => response.json())
                .then(data => {
                    setUsers([...users, data]); // Cập nhật danh sách người dùng
                    alert("Account created successfully!");
                    setIsRightPanelActive(false); // Chuyển về chế độ đăng nhập sau khi đăng ký thành công
                })
                .catch(error => console.error('Error adding new user:', error));
        }
    };

    return (
        <LoginContainer>
            <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebookF /></a>
                            <a href="#" className="social"><FaGooglePlusG /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebookF /></a>
                            <a href="#" className="social"><FaGooglePlusG /></a>
                        </div>
                        <span>or use your account</span>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </LoginContainer>
    );
};

export default Login;