// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/user/signupUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                 'Accept': 'application/json'
             },
            body: JSON.stringify({ username, email, password })
        });

        // Debugging: Log raw response
        const rawResponse = await response.text();
        console.log('Signup Response:', rawResponse);

        try {
            const result = JSON.parse(rawResponse);
            alert(result.msg);

            if (response.ok) {
                document.getElementById('signupForm').reset();
            }
        } catch (jsonError) {
            console.error('Signup JSON Parsing Error:', jsonError.message);
        }
    } catch (error) {
        console.error('Signup Error:', error);
    }
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/user/loginUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Debugging: Log raw response
        const rawResponse = await response.text();
        console.log('Login Response:', rawResponse);

        try {
            const result = JSON.parse(rawResponse);
            alert(result.msg);

            if (response.ok) {
                // Save token to localStorage (optional)
                localStorage.setItem('token', result.token);
                document.getElementById('loginForm').reset();
            }
        } catch (jsonError) {
            console.error('Login JSON Parsing Error:', jsonError.message);
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
});

// Handle Change Password
document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Assuming the token is stored after login
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/user/changePassword', {
            method: 'PUT', // Use PUT for updates
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, // Pass token for authentication
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        // Debugging: Log raw response
        const rawResponse = await response.text();
        console.log('Change Password Response:', rawResponse);

        try {
            const result = JSON.parse(rawResponse);
            alert(result.msg);

            if (response.ok) {
                document.getElementById('changePasswordForm').reset();
            }
        } catch (jsonError) {
            console.error('Change Password JSON Parsing Error:', jsonError.message);
        }
    } catch (error) {
        console.error('Change Password Error:', error);
    }
});