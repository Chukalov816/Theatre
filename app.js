
import { render } from './node_modules/lit-html/lit-html.js'
import page from './node_modules/page/page.mjs'

import { logout as apiLogout } from './api/apiSpecific.js';
import { getUserData } from './api/services.js';
import { homePage } from './pages/home.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';
import { detailsPage } from './pages/details.js';
import { createPage } from './pages/create.js';
import { editPage } from './pages/edit.js';
import { profilePage } from './pages/profile.js';



const main = document.getElementById('content');
document.getElementById('logoutBtn').addEventListener('click', logout)





setUserNav();

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);


page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    ctx.user = getUserData();
    next();

}

function setUserNav() {
    const user = getUserData();
    const userNav = document.querySelectorAll('.user-only');
    const guestNav = document.querySelectorAll('.guest-only');
    if (user) {
        for (const line of userNav) {
            line.style.display = 'block';
        }
        for (const line of guestNav) {
            line.style.display='none';
        }

    } else {
        for (const line of userNav) {
            line.style.display = 'none';
        }
        for (const line of guestNav) {
            line.style.display='block';
        }
    }
}



function logout() {
    apiLogout();
    setUserNav();
    page.redirect('/');
}