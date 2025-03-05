import { AllXP } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getAlltransactionData(eventID: number): Promise<AllXP[] | null> {
    const allXPData = `
      query {
            transaction(
                where: {
                transaction_type: { type: { _eq: "xp" } },
                eventId: { _eq: ${eventID} }
                },
                order_by: { createdAt: desc }
            ) {
                amount
                isBonus
                attrs
                eventId
                createdAt
                object {
                name
                type
                }
            }
            }
      `;
    try {
        const AllXp = await fetchData(allXPData);
        console.log("THE ALLXP", AllXp)
        return AllXp.transaction || null;
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        return null;
    }

}

export { getAlltransactionData }


