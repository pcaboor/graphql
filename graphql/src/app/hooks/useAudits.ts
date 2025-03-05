import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { getAuditData } from "@/lib/audits";
import { Audit } from "../types/types";

function useAudits() {
    const [audit, setAudit] = useState<Audit[]>([]);
    const { userInfo } = useUser();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchTimelineData = async () => {
            try {
                setLoading(true);
                setError(null);

                const userLogin = userInfo?.login

                console.log("User Login", userLogin)

                const auditsData = await getAuditData(String(userLogin));
                if (auditsData) {
                    setAudit(auditsData);
                } else {
                    setError("No Audits data found.");
                }
            } catch (err) {
                setError((err as Error).message);
                console.error("Erreur lors de la récupération des données :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTimelineData();
    }, [userInfo?.login]);
    return { audit, error, loading };
}

export { useAudits };
