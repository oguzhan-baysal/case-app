interface SidebarProps {
  className?: string
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={`bg-white shadow-sm p-4 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Filtreler</h2>
      {/* Filtre komponentleri buraya gelecek */}
    </aside>
  )
}

export default Sidebar 