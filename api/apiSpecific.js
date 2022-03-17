import * as api from './api.js';

const host ='http://localhost:3030';
api.settings.host=host;

export const login= api.login;
export const register= api.register;
export const logout= api.logout;

export async function getAllListings(){
return await api.get(host +'/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function getListingById(id){
    return await api.get(host+'/data/theaters/'+ id);
}

export async function createListing(listing){
return await api.post(host + '/data/theaters',listing )
}

export async function updateListing(id, listing){
    return await api.put(host+'/data/theaters/'+ id, listing);
}

export async function deleteListing(id){
    return await api.del(host+'/data/theaters/'+ id);
}


export async function getProfile(userId){
    return await api.get(host +`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    }

export async function setLike(theatre){
    return await api.post(host +`/data/likes`,theatre);
    }

export async function getLikes(theatreId){
    return await api.get(host +`/data/likes?where=theaterId%3D%22${theatreId}%22&distinct=_ownerId&count`);
    }

export async function getUserLikes(theatreId,userId){
    return await api.get(host +`data/likes?where=theaterId%3D%22${theatreId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    }




