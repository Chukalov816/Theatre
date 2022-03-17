import { html } from '../node_modules/lit-html/lit-html.js';


export const profileTheatreTemplate = (theatre) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${theatre.imageUrl}>
        <h2>${theatre.title}</h2>
        <h6>${theatre.date}</h6>
        <a href="/details/${theatre._id}" class="details-button">Details</a>
    </div>
</div>`