import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
  try {
    const data = await pb.collection("maison").getFullList({
      sort: "-created",
    });
    return data;
  } catch (error) {
    console.log("Une erreur est survenue en lisant la liste des maisons", error);
    return [];
  }
}

export async function getImageUrl(record, recordImage) {
  return pb.files.getURL(record, recordImage);
}

export async function getOffre(id) {
  try {
    const data = await pb.collection("maison").getOne(id);
    return data;
  } catch (error) {
    console.log("Une erreur est survenue en lisant la maison", error);
    return null;
  }
}

export async function addOffre(house) {
  try {
    await pb.collection("maison").create(house);
    return {
      success: true,
      message: "Offre ajoutée avec succès",
    };
  } catch (error) {
    console.log("Une erreur est survenue en ajoutant la maison", error);
    return {
      success: false,
      message: "Une erreur est survenue en ajoutant la maison",
    };
  }
}

export async function filterByPrix(minPrix, maxPrix) {
  try {
    const offres = await getOffres();

    return offres.filter((o) => {
      const prix = Number(o.prix_maison);
      return prix >= minPrix && prix <= maxPrix;
    });
  } catch (error) {
    console.log("Une erreur est survenue en filtrant les offres par prix", error);
    return [];
  }
}
 
export async function setFavori(house) {
  await pb.collection('maison').update(house.id, { favori: !house.favori });
}

export async function getAgents() {
  try {
    const data = await pb.collection("agent").getFullList();
    return data;
  } catch (error) {
    console.log("Une erreur est survenue en récupérant les agents", error);
    return [];
  }
}

export async function getOffresByAgent(id) {
  try {
    const data = await pb.collection("maison").getFullList({
      filter: `agent_maison = "${id}"`,
    });
    return data;
  } catch (error) {
    console.log("Une erreur est survenue en récupérant les offres de l'agent", error);
    return [];
  }
}

export async function getAgent(id) {
  try {
    const agent = await pb.collection("agent").getOne(id);
    return agent;
  } catch (error) {
    console.log("Une erreur est survenue en récupérant l'agent", error);
    return null;
  }
}