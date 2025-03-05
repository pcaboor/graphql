import { useState, useEffect } from "react";
import { TimeLine } from "@/app/types/types";
import { getTimelineData } from "@/lib/timeline";

function useTimeline(selectedEventId?: string | number) {
    const [timeline, setTimeline] = useState<TimeLine | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!selectedEventId) {
            setTimeline(null);
            return;
        }
        const fetchTimelineData = async () => {
            try {
                setLoading(true);
                setError(null);

                const timelinePerEvent = await getTimelineData(Number(selectedEventId));

                if (timelinePerEvent) {
                    setTimeline(timelinePerEvent);
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
    return { timeline, error, loading };
}

export { useTimeline };
