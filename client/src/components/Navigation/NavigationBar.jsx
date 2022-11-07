import NavigationTab from "@components/Navigation/NavigationTab"
import { MdOutlineHome, MdOutlineLibraryAdd, MdOutlineSettings, MdOutlineSupervisedUserCircle } from "react-icons/md"

function NavigationBar({}) {
  return (
    <div className="flex w-full h-[80px] sticky top-0 border-b border-gray-700">
      <div className="flex items-center overflow-hidden px-4 container mx-auto">
        <div className="pr-5 border-r border-gray-700">
          <a href="#" className="flex items-center px-3 py-1 rounded bg-white">
            <p className="mx-auto text-xl font-bold text-gray-900">B</p>
          </a>
        </div>

        <div className="pl-5">
          <div className="flex items-center w-full gap-2">
            <NavigationTab title="Your collection" 
              Icon={MdOutlineHome} 
              selected={true}
              className="" />
            <NavigationTab title="Add a book" 
              Icon={MdOutlineLibraryAdd} />
            
          </div>
        </div>

        <div className="ml-auto flex justify-center gap-2">
          <NavigationTab title="Account" 
            Icon={MdOutlineSupervisedUserCircle} />
          <NavigationTab title="Settings" 
            Icon={MdOutlineSettings} />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar