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
 