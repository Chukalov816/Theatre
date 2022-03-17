import { html } from '../node_modules/lit-html/lit-html.js';



export const theatreTemplate = (theatre) => html`
<div class="eventsInfo">
    <div class="home-image">
        <img src=${theatre.imageUrl}>
    </div>
    <div class="info">
        <h4 class="title">${theatre.title}</h4>
        <h6 class="date">${theatre.date}</h6>
        <h6 class="author">${theatre.author}</h6>
        <div class="info-buttons">
            <a class="btn-details" href="/details/${theatre._id}">Details</a>
        </div>
    </div>
</div>`
