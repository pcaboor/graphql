import { useState, useEffect } from "react";
import { AllXP } from "../types/types";
import { getAlltransactionData } from "@/lib/allXp";

function useAllXP(selectedEventId?: string | number) {
    const [allXP, setAllXP] = useState<AllXP[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        if (!selectedEventId) {
            setAllXP(null);
            return;
        }
        const fetchTimelineData = async () => {
            try {
                setLoading(true);
                setError(null);
                const allXPDaTa = await getAlltransactionData(Number(selectedEventId));
                console.log("***ALL XP*****", allXPDaTa)
                if (allXPDaTa !== null) {
                    setAllXP(allXPDaTa);
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

        fetchTimelineData();
    }, [selectedEventId]);
    return { allXP, error, loading };
}

export { useAllXP };
