export function FiltersContainer() {
  return (
    <div className="w-full rounded-lg p-8 bg-slate-50">
      <h2 className="font-normal text-xs text-gray-400">Categoria</h2>
      <div className="flex gap-1 mt-5">
        <button className="filters-btns shadow-md text-xs">
          Filtro <span>+</span>
        </button>
        <button className="filters-btns shadow-md text-xs">
          Filtro <span>+</span>
        </button>
        <button className="filters-btns shadow-md text-xs">
          Filtro <span>+</span>
        </button>
        <button className="filters-btns shadow-md text-xs">
          Filtro <span>+</span>
        </button>
        <button className="filters-btns shadow-md text-xs">
          Filtro <span>+</span>
        </button>
        <button className="filters-btns shadow-md text-xs">
          Filtro <span>+</span>
        </button>
      </div>
      <div className="mt-5">
        <button className="w-24 h-8 rounded-xl shadow-md font-lato font-bold text-xs mr-5">
          Limpar filtros
        </button>
        <button className="w-24 h-8 rounded-xl shadow-md font-lato font-bold text-xs text-white bg-purple">
          Aplicar filtros
        </button>
      </div>
    </div>
  )
}
