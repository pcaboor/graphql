import { useState, useEffect } from "react";
import { getLevelPerEvent } from "@/lib/level";
import { useUser } from "./useUser";

function useLevel(selectedEventId?: string | number) {
    const [level, setLevel] = useState<number | null>(null);
    const { userInfo } = useUser();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        if (!selectedEventId) {
            setLevel(null);
            return;
        }
        const fetchTimelineData = async () => {
            try {
                setLoading(true);
                setError(null);

                const userLogin = userInfo?.login

                const levelPerEvent = await getLevelPerEvent(String(userLogin), Number(selectedEventId));

                console.log("*********", levelPerEvent)

                if (levelPerEvent !== null) {
                    setLevel(levelPerEvent);
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
    }, [userInfo?.login, selectedEventId]);
    return { level, error, loading };
}

export { useLevel };
