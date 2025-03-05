import { useState, useEffect } from "react";
import { CursusInfo } from "@/app/types/types";
import { getCursusData } from "@/lib/cursus";

function useCursus() {
    const [cursusInfo, setCursusInfo] = useState<CursusInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCursusData = async () => {
            try {
                const cursusData = await getCursusData();
                setCursusInfo(cursusData);
            } catch (err) {
                setError((err as Error).message);
                console.error("Erreur lors de la récupération des données :", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCursusData();
    }, []);
    return { cursusInfo, error, loading };
}

export { useCursus };
