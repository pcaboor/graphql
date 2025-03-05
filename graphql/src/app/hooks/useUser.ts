import { useState, useEffect } from "react";
import { getUserData } from "@/lib/user";
import { UserInfo } from "@/app/types/types";

function useUser() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const userData = await getUserData();
                console.log(userData)
                // Mise à jour des états
                setUserInfo(userData);

            } catch (err) {
                setError((err as Error).message);
                console.error("Erreur lors de la récupération des données :", err);
            } finally {
                setLoading(false); // Désactive le chargement lorsque l'appel est terminé
            }
        };

        fetchAllData();
    }, []); // Le tableau vide [] permet d'exécuter ce useEffect une seule fois au montage du composant

    return { userInfo, error, loading };
}

export { useUser };
