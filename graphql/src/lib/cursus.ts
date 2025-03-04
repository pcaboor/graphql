import { CursusInfo } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getCursusData(): Promise<CursusInfo | null> {
    const cursusData = `
      query {
	    user {
                events(where:{ event: { object: { type : { _in: ["piscine", "module"] }}}}) {
                event {
                id
                object {
                    name
                    type
                        }
                    }
                }
            }
        }
      `;
    try {
        const cursus = await fetchData(cursusData);
        console.log("THE CURSUS", cursus)
        return cursus.user?.[0] || null; // Recupérer depuis user le 0 
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        return null;
    }

}

export { getCursusData }


