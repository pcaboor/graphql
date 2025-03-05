'use client'

import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAudits } from '../hooks/useAudits';
import { Badge } from '@/components/ui/badge';

const Audit = () => {

    const { audit } = useAudits();
    //   const { userInfo } = useUser();
    console.log(audit)

    const auditComplete = audit
        ?.filter(a => a?.grade && a.grade > 0)
        || [];

    // .map(project => ({
    //     name: project.bestProgress?.object?.name || 'Projet sans nom',
    //     status: project.bestProgress?.isDone ? "Terminé" : "En cours"
    // })) 
    return (
        <div className='container mx-auto min-h-screen py-20'>
            <span className='text-3xl'>Your audits
            </span>
            <div className='mt-4 text-sm text-muted-foreground'>Here you can find back all your audits : the ones you have to make and the ones you’ve already made for other students projects.
                For the audits you have to do, hover the block to get the verification code you&apos;ll need to complete the audit on your classmate computer.</div>
            <div className='h-10'></div>
            <Table>
                <TableHeader>

                    <TableRow>
                        <TableHead className="w-[200px]">Captain project</TableHead>
                        <TableHead>Captain</TableHead>
                        <TableHead>Code used</TableHead>

                        <TableHead className="text-right w-[200px]">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {auditComplete.map((a, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{a.group.object.name}</TableCell>
                            <TableCell className="font-medium"> <span className="font-medium text-muted-foreground">{a.group.captainLogin}</span></TableCell>
                            <TableCell className="font-medium"><Badge variant={'outline'} className='text-[#caadff]'>{a.private.code ? a.private.code : "Non défini"}</Badge></TableCell>
                            <TableCell className={a.resultId === "Terminé" ? "text-green-300" : "text-orange-400"}></TableCell>
                            <TableCell className={a?.grade && a?.grade >= 1 ? "text-green-300" : "text-orange-400"}> {a?.grade && a?.grade >= 1 ? 'SUCCEEDED' : 'FAILED'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Audit