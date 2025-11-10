"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DataTable({ columns, data }) {
  // Estados para filtros
  const [filterInput, setFilterInput] = React.useState("")
  const [filterCurso, setFilterCurso] = React.useState("")
  const [filterFecha, setFilterFecha] = React.useState("")
  const [filtering, setFiltering] = React.useState("")

  // Aplica el filtro general con retraso
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setFiltering(filterInput)
    }, 300)
    return () => clearTimeout(timeout)
  }, [filterInput])

  const memoData = React.useMemo(() => data, [data])
  const memoColumns = React.useMemo(() => columns, [columns])

  const table = useReactTable({
    data: memoData,
    columns: memoColumns,
    state: { globalFilter: filtering },
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, value) => {
      const cellValue = String(row.getValue(columnId)).toLowerCase()
      return cellValue.includes(value.toLowerCase())
    },
  })

  React.useEffect(() => {
    table.setPageSize(18)
  }, [table])

  // Filtrado adicional por curso y fecha
  const filteredRows = table
    .getRowModel()
    .rows.filter((row) => {
      const curso = row.original.curso?.toLowerCase() ?? ""
      const fecha = row.original.fecha ?? ""
      const cumpleCurso = filterCurso ? curso.includes(filterCurso.toLowerCase()) : true
      const cumpleFecha = filterFecha ? fecha === filterFecha : true
      return cumpleCurso && cumpleFecha
    })

  // 🔄 Reiniciar filtros
  const resetFilters = () => {
    setFilterInput("")
    setFilterCurso("")
    setFilterFecha("")
    setFiltering("")
  }

  return (
    <div className="w-full space-y-4">
      {/* 🔍 Filtros múltiples */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Filtro general */}
        <Input
          placeholder="Buscar por nombre o matrícula..."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          className="max-w-sm border-gray-400"
        />

        {/* Filtro por curso */}
        <Input
          placeholder="Filtrar por curso (Ej: 5toE)"
          value={filterCurso}
          onChange={(e) => setFilterCurso(e.target.value)}
          className="max-w-xs border-gray-400"
        />

        {/* Filtro por fecha */}
        <Input
          type="date"
          value={filterFecha}
          onChange={(e) => setFilterFecha(e.target.value)}
          className="max-w-xs border-gray-400"
        />

        {/* 🧹 Botón para reiniciar filtros */}
        <Button
          variant="outline"
          onClick={resetFilters}
          disabled={!filterInput && !filterCurso && !filterFecha}
          className="ml-auto text-sm"
        >
          Reiniciar filtros
        </Button>
      </div>

      {/* 🧱 Tabla */}
      <div className="rounded-2xl border border-gray-400">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-[17px] text-gray-800">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {filteredRows.length ? (
              filteredRows.map((row) => (
                <TableRow key={row.id} className="border-b border-gray-400">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-base text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={memoColumns.length}
                  className="h-24 text-base text-center text-gray-500"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔄 Controles de paginación */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
