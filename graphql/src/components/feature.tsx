'use client'

import { CursusInfo } from "@/app/types/types";
import { useEffect, useState } from "react";
import { Feature108 } from "./tabsContent";
import { getCursusData } from "@/lib/cursus";


function Feature() {
    const [cursusInfo, setCursusData] = useState<CursusInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCursusData = async () => {
            try {
                const data = await getCursusData();
                console.log(data);
                setCursusData(data);
            } catch (err) {
                setError((err as Error).message);
                console.error("Erreur lors de la récupération des données utilisateur:", err);
            }
        };
        fetchCursusData(); // Appel de la fonction pour récupérer les données utilisateur
    }, []);

    if (error) {
        return <div className="text-center">{error}</div>;
    }

    if (!cursusInfo) {
        return <div className="text-center">Chargement des données...</div>;
    }

    return (
        <div className="w-full">
            <div className="container mx-auto">
                <Feature108 />
            </div>
        </div>
    );
}

export { Feature };
