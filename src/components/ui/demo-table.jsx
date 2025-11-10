"use client"

import * as React from "react"
import { DataTable } from "@/components/ui/data-table"

const columns = [
  {
    header: "Nombre Completo",
    accessorKey: "nombreCompleto",
  },
  {
    header: "Matrícula",
    accessorKey: "matricula",
  },
    {
    header: "Curso",
    accessorKey: "curso",
  },
  {
    header: "Ausencias",
    accessorKey: "ausencias",
  },
  {
    header: "Tardanzas",
    accessorKey: "tardanzas",
  },
  {
    header: "Tardanzas Justificadas",
    accessorKey: "tardanzasJustificadas",
  },
  
]

const data = [
  {
    nombreCompleto: "Monkey D. Luffy",
    matricula: "2024-0112",
    curso: "4toB",
    fecha: "2025-11-07",
    ausencias: 1,
    tardanzas: 0,
    tardanzasJustificadas: 0,
  },
    {
    nombreCompleto: "Jack Sparrow",
    matricula: "2025-0112",
    curso: "5toE",
    fecha: "2025-11-08",
    ausencias: 0,
    tardanzas: 2,
    tardanzasJustificadas: 1,
  },
  {
    nombreCompleto: "Monkey D. Luffy",
    matricula: "2024-0112",
    curso: "4toB",
    fecha: "2025-11-07",
    ausencias: 1,
    tardanzas: 0,
    tardanzasJustificadas: 0,
  },
]


export function DemoTable() {
  return <DataTable columns={columns} data={data} />
}
