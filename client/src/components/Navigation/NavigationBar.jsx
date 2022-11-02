import NavigationTab from "@components/Navigation/NavigationTab"
import { MdOutlineBook, MdOutlineLibraryAdd, MdOutlineSupervisedUserCircle } from "react-icons/md"

function NavigationBar({}) {
  return (
    <div className="flex flex-col items-center w-[240px] h-screen overflow-hidden border-r border-gray-700 px-2 sticky top-0">
      <a href="#" className="flex items-center w-full px-3 py-4">
        <p className="mx-auto text-lg font-bold text-slate-100">Bookshelf</p>
      </a>

      <div className="w-full">
        <div className="flex flex-col items-center w-full">
          <NavigationTab title="Your collection" 
            Icon={MdOutlineBook} 
            selected={true}
            className="mt-3" />
          <NavigationTab title="Add a book" 
            Icon={MdOutlineLibraryAdd} />
          
        </div>
      </div>

      <NavigationTab title="Account" 
        Icon={MdOutlineSupervisedUserCircle} 
        className="mt-auto mb-2 justify-center" />
    </div>
  )
}

export default NavigationBar