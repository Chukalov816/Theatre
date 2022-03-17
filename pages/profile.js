import { getProfile } from '../api/apiSpecific.js'
import { html } from '../node_modules/lit-html/lit-html.js'
import {profileTheatreTemplate } from './profileCard.js';



export const profileTemplate = (theatres, userEmail) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${userEmail}</h2>
    </div>
    <div class="board">
       
    ${theatres.length == 0 ? html`<div class="no-events">
            <p>This user has no events yet!</p>
        </div>` : theatres.map(profileTheatreTemplate)}
        
    </div>
</section>`



export async function profilePage(ctx) {
    const theatres = await getProfile(ctx.user._id);
    const userEmail =ctx.user.email;
      

    ctx.render(profileTemplate(theatres, userEmail));
}