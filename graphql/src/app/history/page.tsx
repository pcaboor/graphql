'use client'

import React from 'react'
import { useGrade } from '../hooks/useGrade';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { useUser } from '../hooks/useUser';

const History = () => {
    const { gradeInfo } = useGrade();
    const { userInfo } = useUser();
    const projectDone = gradeInfo?.user?.progressesByPath
        ?.filter(project => project?.bestProgress)
        .map(project => ({
            name: project.bestProgress?.object?.name || 'Projet sans nom',
            status: project.bestProgress?.isDone ? "Terminé" : "En cours"
        })) || [];
    return (
        <div className='container mx-auto min-h-screen py-20'>
            <span className='text-3xl'>Projects completed history</span>
            <div className='h-10'></div>
            <Table>
                <TableHeader>

                    <TableRow>
                        <TableHead className="w-[100px]">Projets</TableHead>
                        <TableHead>Status</TableHead>

                        <TableHead className="text-right">Repository</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectDone.map((project, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">Project - {project.name}</TableCell>
                            <TableCell className={project.status === "Terminé" ? "text-green-300" : "text-orange-400"}>{project.status}</TableCell>
                            <TableCell className="text-right"><Link href={`https://zone01normandie.org/git/${userInfo?.login}/${project.name}`}>Repository -{">"}</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default History