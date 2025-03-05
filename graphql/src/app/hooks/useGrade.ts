import { useState, useEffect } from "react";
import { Grade } from "@/app/types/types";
import { getGradeData } from "@/lib/grade";

function useGrade() {
    const [gradeInfo, setGradeInfo] = useState<Grade | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGradeData = async () => {
            try {
                const gradeData = await getGradeData();
                setGradeInfo(gradeData);
            } catch (err) {
                setError((err as Error).message);
                console.error("Erreur lors de la récupération des données :", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGradeData();
    }, []);
    return { gradeInfo, error, loading };
}

export { useGrade };
