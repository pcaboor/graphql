import { TotalXPInfo } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getTotalXPData(eventId: number): Promise<TotalXPInfo | null> {
    const totalXPData = `
     query {
        transaction_aggregate(where: {
            type: { _eq: "xp" },
            eventId: {_eq: ${eventId}}
        }) {
            aggregate {
                sum {
                    amount
                }
            }
        }
    }`;

    try {
        const totalXP = await fetchData(totalXPData);
        return totalXP || null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export { getTotalXPData }