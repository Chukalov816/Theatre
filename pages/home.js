import { getAllListings} from '../api/apiSpecific.js';
import { html } from '../node_modules/lit-html/lit-html.js'
import { theatreTemplate } from './theatreCard.js';



export const homeTemplate = (theatres) => html`
    <section class="welcomePage">
        <div id="welcomeMessage">
            <h1>My Theater</h1>
            <p>Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI Cooperating Members, theatre
                professionals, theatre organizations, theatre universities and theatre lovers all over the world on
                the 27th of March. This day is a celebration for those who can see the value and importance of the
                art
                form “theatre”, and acts as a wake-up-call for governments, politicians and institutions which have
                not
                yet recognised its value to the people and to the individual and have not yet realised its potential
                for
                economic growth.</p>
        </div>
        <div id="events">
            <h1>Future Events</h1>
            <div class="theaters-container">
    
            ${theatres.length == 0 ? html`<h4 class="no-event">No Events Yet...

            </h4>`: theatres.map(theatreTemplate)}
    
                
            </div>
        </div>
    </section>

`

export async function homePage(ctx) {
    const theatres = await getAllListings();
    ctx.render(homeTemplate(theatres));
}