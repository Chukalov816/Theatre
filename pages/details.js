
import { deleteListing, getLikes, getListingById, getUserLikes, setLike } from '../api/apiSpecific.js';
import { html } from '../node_modules/lit-html/lit-html.js'


export const detailsTemplate = (theatre, isOwner, onDelete, onLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theatre.title}</h1>
            <div>
                <img src=${theatre.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theatre.description}</p>
            <h4>Date: ${theatre.date}</h4>
            <h4>Author: ${theatre.author}</h4>
            ${isOwner ? html`<div class="buttons">
                <a @click=${onDelete} class="btn-delete">Delete</a>
                <a class="btn-edit" href="/edit/${theatre._id}">Edit</a>

            </div>` : html`<a @click=${onLike} class="btn-like">Like</a>`}

            <p id="counter" class="likes"></p>
        </div>
    </div>
</section>
`


export async function detailsPage(ctx) {
    const theatreId = ctx.params.id;
    const theatre = await getListingById(theatreId);
    const isOwner = ctx.user && theatre._ownerId == ctx.user._id;
    ctx.render(detailsTemplate(theatre, isOwner, onDelete, onLike));

    async function onDelete(e) {
        e.preventDefault();
        const confirmDelete = confirm('Are you sure?');
        if (confirmDelete) {
            await deleteListing(theatreId);
            ctx.page.redirect('/profile');
        }


    }
    async function onLike(e) {
        e.preventDefault();
        await setLike(theatre);
        let count = await getLikes(theatreId, ctx.user._id);
        let counter = document.getElementById('counter');
        counter.textContent=count.length;
        let userLikes= await getUserLikes(theatreId,ctx.user._id);
        console.log(userLikes);
        if (userLikes==1) {
            e.target.remove();
        }
    }
}

