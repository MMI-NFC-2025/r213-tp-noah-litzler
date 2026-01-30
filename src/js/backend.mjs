import PocketBase from 'pocketbase' ;
const pb = new PocketBase('http://127.0.0.1:8090') ;

export async function allMaisons() {
const records = await pb.collection('maison').getFullList() ;
return records ;
} 

export async function OneID(id) {   
const records = await pb.collection('maison').getOne(id) ;
return records ;
}

export async function allMaisonsFavori() {   
const records = await pb.collection('maison').getFullList({filter : 'favori = true'}) ;
return records ;
}

export async function allMaisonsSorted() {   
const records = await pb.collection('maison').getFullList({sort : 'prix_maison'}) ;
return records ;
} 

export async function bySurface(s) {   
const records = await pb.collection('maison').getFullList({filter : `surface >= ${s}`}) ;
return records ;
}   

export async function surfaceORprice(s, p) {   
const records = await pb.collection('maison').getFullList({filter : `surface >= ${s} && prix_maison <= ${p}`}) ;
return records ;
}  

export async function getEvents() {
    let events = await pb.collection("events").getFullList();
    return events;
}

export async function getOffres() {
    try {
        let data = await pb.collection('maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return pb.files.getURL(record, recordImage);
}