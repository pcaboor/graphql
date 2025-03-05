'use client'

import { UserInfo, CursusInfo } from "@/app/types/types";
import { getUserData } from "@/lib/user";
import { getCursusData } from "@/lib/cursus";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
//TabsContent
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Progress } from "./ui/progress";
import { useXP } from "@/app/hooks/useXP";
//import { useTimeline } from "@/app/hooks/useTimeline";
import { useLevel } from "@/app/hooks/useLevel";
import Link from "next/link";
import { useAllXP } from "@/app/hooks/useAllXP";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
import VerticalBarChart from "./chart";
import XPLineChart from "./graph";

interface TabContent {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
}

interface Tab {
    value: string;
    icon: React.ReactNode;
    label: string;
    content: TabContent;
}

interface Feature108Props {
    badge?: string;
    heading?: string;
    description?: string;
    tabs?: Tab[];
}

const Feature108 = ({

}: Feature108Props) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [cursusInfo, setCursusInfo] = useState<CursusInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
    const { totalXPInfo } = useXP(selectedEventId);
    const { level } = useLevel(selectedEventId)
    const { allXP } = useAllXP(selectedEventId);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [userData, cursusData] = await Promise.all([
                    getUserData(),
                    getCursusData(),
                    //  getCursusDetailsData(),
                ]);
                setUserInfo(userData);
                setCursusInfo(cursusData);

                if (cursusData?.events && cursusData.events.length > 0) {
                    setSelectedEventId(String(cursusData.events[0].event.id));
                }

            } catch (err) {
                setError((err as Error).message);
                console.error("Erreur lors de la récupération des données :", err);
            }
        };
        fetchAllData();
    }, []);

    function formatXP(amount: number): string {
        if (amount > 1000000) {
            // Convertir le montant en chaîne de caractères et insérer un point après le premier chiffre
            const amountStr = amount.toString();
            // Ici on prend le premier chiffre, ajoute un point, puis on prend les deux chiffres suivants
            return `${amountStr.slice(0, 1)}.${amountStr.slice(1, 3)} MB`;
        } else {
            const amountStr = amount.toString();
            return `${amountStr.slice(0, 3)} KB`;
        }
    }


    if (error) {
        return <div className="text-center">{error}</div>;
    }

    if (!userInfo || !cursusInfo) {
        return <div className="text-center">Chargement des données...</div>;
    }

    // PROCESS VAR
    const ratio = userInfo.totalDown && userInfo.totalUp ? parseFloat((userInfo.totalUp / userInfo.totalDown).toFixed(1)) : null;
    // const xp = totalXPInfo?.transaction_aggregate?.aggregate?.sum?.amount;
    // const userXp = xp ? Number(xp.toString().slice(0, 3)) : "Loading...";

    const demoProjectXP = allXP?.slice(0, 8)
    const today = new Date();

    return (
        <section>
            <div className="container mx-auto">
                {/* Section d'information utilisateur */}
                <div className="flex gap-3 items-start justify-between">
                    <h1 className="text-6xl mb-10">
                        Welcome, {userInfo.attrs.firstName} {userInfo.attrs.lastName}
                    </h1>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <svg type="submit" role="img" width="40px" viewBox="0 0 24 28" aria-label="icon"><g fill="none" stroke="#e8e1f0" strokeWidth="0.6px"><path d="M 21.0826 20.965 M 9.9138 13.9199 C 13.4755 13.9199 16.3621 11.0281 16.3621 7.46 C 16.3621 3.8918 13.4755 1 9.9138 1 C 6.3521 1 3.4655 3.8918 3.4655 7.46 C 3.4655 11.0281 6.3521 13.9199 9.9138 13.9199 Z M 9.9138 13.9199 C 11.7933 13.9199 13.1379 13.1599 13.1379 13.1599 C 14.2228 13.5228 15.2298 14.1726 16.1003 15.0314 C 13.3731 15.4646 11.2869 17.8301 11.2869 20.6857 C 11.2869 21.3792 11.4102 22.0442 11.6359 22.6598 H 1 C 1 18.2899 3.4655 14.4899 6.8793 13.1599 C 6.8793 13.1599 7.784 13.9199 9.9138 13.9199 Z M 17.9741 15.9301 C 20.7507 15.9301 23 18.1835 23 20.965 C 23 23.7466 20.7507 26 17.9741 26 C 15.1976 26 12.9483 23.7466 12.9483 20.965 C 12.9483 18.1835 15.1976 15.9301 17.9741 15.9301 Z"></path><path d="M 16.311 21.7208 L 17.628 22.8947 M 17.6441 22.8767 L 16.0186 24.1712 C 16.0105 24.1784 16.0007 24.1824 15.9908 24.1822 C 15.9808 24.1822 15.971 24.1783 15.9628 24.171 C 15.9546 24.1638 15.9484 24.1535 15.9449 24.1417 C 15.9415 24.1297 15.941 24.1167 15.9434 24.1044 L 16.3359 21.7112 L 18.5701 17.6531 C 18.59 17.617 18.6202 17.5925 18.6543 17.5848 C 18.6885 17.5771 18.7236 17.587 18.752 17.6123 L 19.8462 18.5874 C 19.8746 18.6128 19.8938 18.6514 19.8997 18.6948 C 19.9058 18.7382 19.898 18.7829 19.8782 18.8191 L 17.644 22.8767 Z"></path></g></svg>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-3xl min-h-screen">
                                <DrawerHeader>
                                    <DrawerTitle className="text-6xl">{userInfo.attrs.firstName} {userInfo.attrs.lastName}</DrawerTitle>
                                    <DrawerDescription className="text-2xl"># {userInfo.login}</DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-5">Vos informations</h2>
                                    <div className="flex gap-3">
                                        <label>Email:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.email || "Non renseigné"}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label>Phone:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.Phone || "Non renseigné"}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label>Genre:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.gender || "Non renseigné"}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label>Date de naissance:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.dateOfBirth || "Non renseigné"}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label>Lieu de naissance:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.placeOfBirth || "Non renseigné"}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label>Pays de naissance:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.countryOfBirth || "Non renseigné"}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label>Ville:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.addressCity || "Non renseigné"}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label>Pays de résidence:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.addressCountry || "Non renseigné"}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label>Complément Adress:</label>
                                        <p className="text-[#b795ff]">{userInfo.attrs.addressComplementStreet || "Non renseigné"} </p>
                                    </div>
                                </div>

                                <DrawerFooter>
                                    <Button>Modifier</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Fermer</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>

                </div>
                <div className="flex flex-col gap-4">

                    <div className="flex flex-wrap gap-3">
                        {userInfo.labels.map((label) => (
                            <div
                                key={label.labelName}
                                className="flex items-center gap-3"
                            >
                                <svg
                                    role="img"
                                    width="20px"
                                    viewBox="0 0 130 130"
                                    aria-label="icon"
                                >
                                    <g
                                        fill="none"
                                        stroke="#e8e1f0"
                                        strokeWidth="3px"
                                    >
                                        <line x1="30" y1="20" x2="3" y2="50" />
                                        <line x1="30" y1="115" x2="3" y2="88" />
                                        <line x1="3" y1="50" x2="3" y2="88" />
                                        <line x1="130" y1="115" x2="130" y2="20" />
                                        <line x1="30" y1="20" x2="130" y2="20" />
                                        <line x1="30" y1="115" x2="130" y2="115" />
                                        <ellipse cx="40" rx="9" cy="68" ry="9" />
                                    </g>
                                </svg>
                                <span className="text-sm text-white">
                                    Labels : {label.labelName}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Composant Tabs  defaultValue={0} */}
                <Tabs className="mt-8">
                    <Tabs defaultValue={selectedEventId} onValueChange={setSelectedEventId} className="mt-8">
                        <TabsList className="container flex flex-col items-center sm:flex-row">
                            {cursusInfo?.events?.map(e => (
                                <TabsTrigger
                                    key={e.event.id}
                                    value={String(e.event.id)}
                                    className="text-xl text-ellipsis whitespace-nowrap flex items-center w-full gap-2 px-4 py-10 text-muted-foreground data-[state=active]:bg-[#9969FF] bg-muted data-[state=active]:text-primary border-neutral-600 border "
                                >
                                    {e.event.object.name} #{e.event.id}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                        <div className="bg-white h-full lg:col-span-1 p-6 aspect-square items-center justify-center lg:aspect-auto flex gap-2">
                            <div className="flex flex-col items-center text-black">
                                <div className="text-lg mb-4">Current level</div>
                                <div className="w-40 h-40 shadow-2xl rounded-full text-4xl flex items-center justify-center">
                                    Lvl {level}
                                </div>

                            </div>
                        </div>

                        <div className="bg-muted  h-full lg:col-span-1 p-6 aspect-square lg:aspect-auto flex justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight"></h3>
                                <p className="text-[#caadff] max-w-xs text-6xl">
                                    What&apos;s UP
                                </p>
                                <Link href={"/audits"} className="text-lg text-green-300">Audits history -{">"}</Link>
                            </div>
                        </div>
                        <div className="bg-muted  aspect-square p-6">
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight mb-2">Audits ratio</h3>

                                {/* Done section */}
                                <div className="flex flex-col gap-2 mb-3 text-sm text-muted-foreground">

                                    <span>Done:</span>
                                    <div className="flex items-center gap-2">
                                        <Progress
                                            value={(userInfo.totalUp / (userInfo.totalDown + userInfo.totalUp)) * 100}
                                            className="h-1.5  rounded-none"
                                        />
                                        <span>{userInfo.totalUp} {userInfo && userInfo.totalUp > 1000000 ? "MB" : "KB"}</span>
                                        <ArrowUp className="h-5" />
                                    </div>
                                </div>
                                {/* Received section */}
                                <div className="flex flex-col gap-2 mb-3 text-sm text-muted-foreground">
                                    <span>Received:</span>
                                    <div className="flex items-center gap-2">
                                        <Progress
                                            value={100}
                                            className={`h-1.5 rounded-none ${ratio && ratio < 1 ? "bg-[#ffa482]" : "text-green-500"}`}
                                        />
                                        <span>{userInfo.totalDown} {userInfo && userInfo.totalDown > 1000000 ? "MB" : "KB"}</span>
                                        <ArrowDown className="h-5 " />
                                    </div>
                                </div>
                                {/* Final ratio and call to action */}
                                <div className="flex items-end justify-between gap-4 mt-4">
                                    <div className={`text-6xl ${ratio && ratio < 1 ? "text-[#ffa482]" : "text-green-500"} `}>
                                        {ratio}
                                        <span className="text-lg ml-4">
                                            {ratio && ratio < 1 ? "Make more audit!" : "Continue!"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-muted  h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex gap-2 flex-col items-start">
                            <div className="flex gap-3 items-center">
                                <span className="text-7xl text-[#caadff]">
                                    {totalXPInfo?.transaction_aggregate?.aggregate?.sum?.amount
                                        ? formatXP(totalXPInfo.transaction_aggregate.aggregate.sum.amount)
                                        : "Loading..."}
                                </span>
                                <Link href={"/history"} className="text-lg ml-4 text-[#caadff]">Projet history -{">"}</Link>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Captain project</TableHead>
                                        <TableHead>Gain</TableHead>
                                        <TableHead className=" w-[200px]">Type</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody >
                                    {demoProjectXP?.map((xp, index) => (
                                        <TableRow key={index}>
                                            <TableCell className={xp.isBonus ? 'text-green-500' : ''}> {xp.object.name}</TableCell>
                                            <TableCell className="font-medium"> {(xp.amount).toFixed(1)} {xp.amount > 1000000 ? "MB" : "KB"}
                                            </TableCell>
                                            <TableCell> {xp.object.type}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="bg-white text-[#b795ff] p-6 text-6xl shadow-2xl">
                            {today.toDateString()}
                        </div>
                        <div className="bg-muted  h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex gap-2 flex-col items-start">
                            <XPLineChart xpData={allXP} />
                        </div>
                        <div className="bg-muted   p-6">
                            <VerticalBarChart xpData={allXP} />

                        </div>

                    </div>
                </Tabs>
            </div>
            {/* Drawer - Will only show when drawerOpen is true */}


        </section>
    );
};

export { Feature108 };
