import styles from '../styles/Login.module.css'
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function Login() {

    // const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    var loginId;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation
        if (!username || !password) {
            alert('Username and password are required');
            return;
        }
        const credentials = {
            "NSX": {
                "Credentials": {
                    "UserName": username,
                    "PW2": password
                }
            }
        };
        // Login logic
        fetch('https://ipfone-nsx.ipfone.com/rest/mqs/NSX/Login?_content=json&id=12731518-1', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    loginId = data.NSX.LoginId;
                    alert('Login ' + loginId)
                    handleSetShare();
                    setIsLoggedIn(true);
                }
            })
            .catch(error => {
                alert('Error:' + error);
                alert('An error occurred. Please try again later.');
            });
    }

    if (isLoggedIn) {
        // navigate('/fax-app', { state: { loginId } });
        return null;
    }

    // Create a new Webex app instance
    var app = new window.Webex.Application();

    // Wait for onReady() promise to fulfill before using framework
    app.onReady().then(() => {
        log("App ready. Instance", app);
    }).catch((errorcode) => {
        log("Error with code: ")
    });

    function handleSetShare() {
        var url = `https://ramirovolodarsky.github.io/fax-sender-webex/fax-app?loginId=${loginId}`;
        app.setShareUrl(url, "", "Shared App").then(() => {
            log("Set share URL", url);
        }).catch((errorcode) => {
            log("Error: " + errorcode)
        });
    }

    // Utility function to log app messages
    function log(type, data) {
        var ul = document.getElementById("console");
        var li = document.createElement("li");
        var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
        li.appendChild(payload)
        ul.prepend(li);
    }

    return (
        <div className={styles.textCenter}>
            <div className={styles.textCenter}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
