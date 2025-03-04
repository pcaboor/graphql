import { CursusInfo } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getCursusDetailsData(id: string): Promise<CursusInfo | null> {
    const cursusDetailsData = `
            query {
        event(where: { id: { _eq: ${id} } }) {
            id
            startAt
            endAt
            object {
            name
            type
            }
            parent {
            id
            object {
                name
                type
            }
            }
        }
        }

      `;
    try {
        const cursus = await fetchData(cursusDetailsData);
        console.log("THE DETAILS", cursus)
        return cursus.user || null; // Recupérer depuis user le 0 
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        return null;
    }

}

export { getCursusDetailsData }


