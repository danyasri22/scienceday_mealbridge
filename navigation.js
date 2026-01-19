// navigation.js - Full PlateShare Sidebar Configuration

const createSideNav = () => {
    // 1. IMPORT PREMIUM FONTS
    if (!document.getElementById('MealBridgefonts')) {
        const fontLink = document.createElement('link');
        fontLink.id = 'MealBridge-fonts';
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap';
        document.head.appendChild(fontLink);
    }

    // 2. GET USER DATA
    const name = localStorage.getItem('userName') || "Guest User";
    const email = localStorage.getItem('userEmail') || "Welcome to MealBridge";
    const initial = name.charAt(0).toUpperCase();
    
    // 3. DETECT CURRENT PAGE
    // Improved logic to handle empty paths or index files
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "" || currentPath === "index.html") currentPath = 'omg.html';

    // 4. GENERATE HTML
    const navHTML = `
        <style>
            .nav-item {
                display: flex; align-items: center; padding: 14px 20px; margin-bottom: 8px;
                text-decoration: none; color: #4b5563; font-weight: 500; font-size: 15px;
                border-radius: 12px; transition: all 0.2s ease; position: relative;
            }
            .nav-item:hover { background: #f9fafb; color: #088f69; padding-left: 25px; }
            .active-page { background: #f0fdf4 !important; color: #088f69 !important; font-weight: 700; }
            .active-page::before {
                content: ''; position: absolute; left: 0; top: 25%; height: 50%;
                width: 4px; background: #088f69; border-radius: 0 4px 4px 0;
            }
        </style>

        <div id="menu-icon" onclick="toggleSidebar()" style="position: fixed; top: 20px; left: 20px; cursor: pointer; z-index: 3000; background: #ffffff; padding: 12px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 4px;">
            <div style="width: 22px; height: 2px; background: #088f69;"></div>
            <div style="width: 16px; height: 2px; background: #088f69;"></div>
            <div style="width: 22px; height: 2px; background: #088f69;"></div>
        </div>

        <div id="nav-overlay" onclick="toggleSidebar()" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.3); backdrop-filter: blur(6px); z-index: 3001; display: none; opacity: 0; transition: opacity 0.3s ease;"></div>

        <div id="side-sidebar" style="position: fixed; top: 0; left: -320px; width: 300px; height: 100%; background: #ffffff; z-index: 3002; display: flex; flex-direction: column; font-family: 'Inter', sans-serif; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
            <div style="padding: 60px 24px 30px; text-align: center; border-bottom: 1px solid #f3f4f6; position: relative; background: #fafafa;">
                <button onclick="toggleSidebar()" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 26px; color: #9ca3af; cursor: pointer;">&times;</button>
                <div style="width: 75px; height: 75px; background: #088f69; color: white; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 700; box-shadow: 0 8px 16px rgba(8, 143, 105, 0.25);">${initial}</div>
                <h3 style="margin: 0; color: #111827; font-size: 22px; font-family: 'Playfair Display', serif;">${name}</h3>
                <p style="margin: 6px 0 0; color: #6b7280; font-size: 13px;">${email}</p>
            </div>

            <nav style="flex-grow: 1; padding: 30px 15px;">
                <a href="omg.html" class="nav-item ${currentPath === 'omg.html' ? 'active-page' : ''}">🏠 Home</a>
                <a href="food.html" class="nav-item ${currentPath === 'food.html' ? 'active-page' : ''}">🍎 Available Foods</a>
                <a href="donate.html" class="nav-item ${currentPath === 'donate.html' ? 'active-page' : ''}">🎁 Donate Food</a>
            </nav>

            <div style="padding: 30px 20px;">
                <button onclick="logout()" style="width: 100%; padding: 14px; background: #111827; color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 600;">LOG OUT</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
};

// 5. IMPROVED SIDEBAR TOGGLE
window.toggleSidebar = function() {
    const sidebar = document.getElementById('side-sidebar');
    const overlay = document.getElementById('nav-overlay');
    
    // Use transform for better performance than 'left'
    const isOpen = sidebar.style.transform === "translateX(320px)";
    
    if (isOpen) {
        sidebar.style.transform = "translateX(0px)";
        overlay.style.opacity = "0";
        setTimeout(() => { overlay.style.display = "none"; }, 300);
    } else {
        overlay.style.display = "block";
        setTimeout(() => { 
            overlay.style.opacity = "1";
            sidebar.style.transform = "translateX(320px)"; 
        }, 10);
    }
};

window.logout = function() {
    localStorage.clear(); // Clears all session data
    window.location.href = 'login.html';
};


createSideNav();
