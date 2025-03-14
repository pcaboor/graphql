import { useState, useEffect } from "react";
import { TotalXPInfo } from "@/app/types/types";
import { getTotalXPData } from "@/lib/totalXP";

function useXP(selectedEventId?: string | number) {
    const [totalXPInfo, setTotalXPInfo] = useState<TotalXPInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!selectedEventId) {
            setTotalXPInfo(null);
            return;
        }
        const fetchXPData = async () => {
            try {
                setLoading(true);
                setError(null);

                const totalXP = await getTotalXPData(Number(selectedEventId));

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

        fetchXPData();
    }, [selectedEventId]);
    return { totalXPInfo, error, loading };
}

export { useXP };
