import { TotalXPInfo } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getTotalXPData(id: number): Promise<TotalXPInfo | null> {
    const totalXPData = `
     query {
        transaction_aggregate(where: {
            type: { _eq: "xp" },
            eventId: {_eq: ${id}}
        }) {
            aggregate {
            sum {
                amount
            }
            }
        }
        }
      `;
    try {
        const totalXP = await fetchData(totalXPData);
        console.log("THE TOTALXP", totalXP)
        return totalXP || null; // Recupérer depuis user le 0 
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        return null;
    }

}

export { getTotalXPData }


