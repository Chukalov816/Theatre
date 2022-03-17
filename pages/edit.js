import { getListingById, updateListing } from '../api/apiSpecific.js';
import { html } from '../node_modules/lit-html/lit-html.js'


export const editTemplate = (theatre, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" .value=${theatre.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${theatre.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" .value=${theatre.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description" placeholder="Description"
                .value=${theatre.description}></textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value=${theatre.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>
`

export async function editPage(ctx) {
    const theatreId = ctx.params.id;
    const theatre = await getListingById(theatreId);
    ctx.render(editTemplate(theatre, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const editedTheatre = {
            title: formData.get('title').trim(),
            date: formData.get('date').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            author: formData.get('author').trim(),
            description: formData.get('description').trim()
        }


        if (!editedTheatre.title || !editedTheatre.date || !editedTheatre.imageUrl || !editedTheatre.description || !editedTheatre.author) {
            return alert('All fields are required!');
        }

        await updateListing(theatreId, editedTheatre);
        e.target.reset();
        ctx.page.redirect('/details/' + theatreId);

    }
}
