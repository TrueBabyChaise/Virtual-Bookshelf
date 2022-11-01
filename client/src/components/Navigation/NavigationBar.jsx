import NavigationTab from "@components/Navigation/NavigationTab"

function NavigationBar({}) {
  return (
    <div className="max-w-[240px] w-full border-r dark:border-red-500">
      <div className="flex flex-col">
        <div className="h-[80px] flex">
          <h1 className="text-center font-bold m-auto dark:text-slate-50">Bookshelf</h1>
        </div>

        <div className="flex flex-col">
          <NavigationTab title="Your collection" />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar