import { useState, useEffect } from "react";
import { TotalXPInfo } from "@/app/types/types";
import { getTotalXPData } from "@/lib/totalXP";

function useXP() {
    const [totalXPInfo, setTotalXPInfo] = useState<TotalXPInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const totalXP = await getTotalXPData(260);
                if (totalXP) {
                    setTotalXPInfo(totalXP);
                } else {
                    setError("No XP data found.");
                }
            } catch (err) {
                setError((err as Error).message);
                console.error("Erreur lors de la récupération des données :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);
    return { totalXPInfo, error, loading };
}

export { useXP };
