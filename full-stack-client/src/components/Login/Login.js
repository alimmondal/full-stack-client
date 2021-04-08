
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword,  handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }



    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div className="container formGroup" >
                <h3>Create New Account?</h3>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Sign Up</label>

                <form onSubmit={handleSubmit}>
                    {newUser && <input type="text" onBlur={handleBlur}
                        name="name" placeholder="your name" required />}
                    <br />
                    <br />
                    <input type="text" onBlur={handleBlur}
                        name="email" placeholder="your email" required />
                    <br />
                    <br />

                    <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                    <br />
                    <br />
                    <input type="password" onBlur={handleBlur} name="password" placeholder="Confirm Password" required />
                    <br />
                    <br />
                    <input type="submit" value={newUser ? 'Sign UP' : 'Sign In'} />

                </form>
            </div>

            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>{user.success}User {newUser ? ' created' : ' Logged In'}successfully</p>
            }
            <br />
            <h3>Continue with social account?</h3>
            <button onClick={googleSignIn}>Sign In with Google</button>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}


export default Login;