document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements Mapping
    const loginCard = document.getElementById("login-card");
    const registerCard = document.getElementById("register-card");
    const authContainer = document.getElementById("auth-container");
    const dashboardContainer = document.getElementById("dashboard-container");

    const toRegisterLink = document.getElementById("to-register");
    const toLoginLink = document.getElementById("to-login");

    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout-btn");
    
    const userDisplayName = document.getElementById("user-display-name");
    document.getElementById("current-date").innerText = new Date().toDateString();

    // 1. Navigation Panel Toggles
    toRegisterLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginCard.classList.add("hidden");
        registerCard.classList.remove("hidden");
    });

    toLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        registerCard.classList.add("hidden");
        loginCard.classList.remove("hidden");
    });

    // 2. Mock Registration Handling
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;

        // Save credential payload to LocalStorage
        const userPayload = { name, email, password };
        localStorage.setItem(email, JSON.stringify(userPayload));

        alert("Registration Successful! Please sign in.");
        registerForm.reset();
        toLoginLink.click(); // Redirect back to login screen view
    });

    // 3. Mock Authentication Handling
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // Fetch recorded profile from LocalStorage sandbox 
        const storedUser = localStorage.getItem(email);

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.password === password) {
                // Initialize Dashboard Interface Screen Access
                userDisplayName.innerText = parsedUser.name;
                authContainer.classList.add("hidden");
                dashboardContainer.classList.remove("hidden");
                loginForm.reset();
                return;
            }
        }
        alert("Invalid email or password combination. Please try again!");
    });

    // 4. Session Exit Handlers
    logoutBtn.addEventListener("click", () => {
        dashboardContainer.classList.add("hidden");
        authContainer.classList.remove("hidden");
    });
});