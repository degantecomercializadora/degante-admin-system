// ════════════════════════════════════════════════════════════════════════════
//  ADMIN AUTHENTICATION
// ════════════════════════════════════════════════════════════════════════════

window.handleAdminLogin = (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    
    if (user === 'DeGante' && pass === 'DeGante2026!') {
        localStorage.setItem('adminToken', 'authed_degante');
        document.getElementById('adminLoginScreen').classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            document.getElementById('adminLoginScreen').classList.add('hidden');
            document.getElementById('adminApp').classList.remove('hidden');
            setTimeout(() => document.getElementById('adminApp').classList.remove('opacity-0'), 50);
            
            startInactivityTimer();
            // Force load the active tab, typically 'productos'
            if(window.switchTab) {
                window.switchTab('productos');
            }
        }, 500);
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
};

window.logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    location.reload();
};

// Check auth state on load
document.addEventListener('DOMContentLoaded', () => {
    const adminApp = document.getElementById('adminApp');
    const loginScreen = document.getElementById('adminLoginScreen');
    
    if (localStorage.getItem('adminToken') === 'authed_degante') {
        if(loginScreen) loginScreen.classList.add('hidden', 'opacity-0');
        if(adminApp) adminApp.classList.remove('hidden', 'opacity-0');
        startInactivityTimer();
    } else {
        if(adminApp) adminApp.classList.add('hidden', 'opacity-0');
        if(loginScreen) {
            loginScreen.classList.remove('hidden');
            setTimeout(() => loginScreen.classList.remove('opacity-0'), 50);
        }
    }
});

// Inactivity Timer Logic
let inactivityTimeout;
const INACTIVITY_LIMIT_MS = 5 * 60 * 1000; // 5 minutos

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        if (localStorage.getItem('adminToken')) {
            alert('Sesión expirada por inactividad.');
            window.logoutAdmin();
        }
    }, INACTIVITY_LIMIT_MS);
}

function startInactivityTimer() {
    resetInactivityTimer();
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetInactivityTimer);
    });
}
