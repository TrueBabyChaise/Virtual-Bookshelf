import NavigationTab from "@components/Navigation/NavigationTab"
import Search from "@components/Search/Search"
import { useState, Fragment } from "react"
import { useAuth } from "@hooks/useAuth"
import { Menu, Transition } from "@headlessui/react"
import { MdOutlineHome, MdOutlineLibraryAdd, MdOutlineSettings, MdOutlineSupervisedUserCircle, MdOutlineLogout } from "react-icons/md"

function NavigationBar({}) {
  const [searchOpened, setSearchOpened] = useState(false)
  const { user, signout } = useAuth()

  /**
   * Toggle book search on page
   */
  const toggleSearch = () => {
    document.querySelector('body').classList.toggle('overflow-hidden')
    setSearchOpened(prev => !prev)
  }

  return (
    <>
      <div className="flex w-full h-[80px] sticky top-0 border-b border-gray-700 bg-gray-900 z-10">
        <div className="flex items-center px-4 container mx-auto">
          <div className="pr-5 border-r border-gray-700">
            <a href="#" className="flex items-center px-3 py-1 rounded bg-white">
              <p className="mx-auto text-xl font-bold text-gray-900">B</p>
            </a>
          </div>

          <div className="pl-5">
            <div className="flex items-center w-full gap-2">
              <NavigationTab subtitle="Your collection" 
                Icon={MdOutlineHome} 
                selected={true}
                className="" />
              <NavigationTab subtitle="Add a book" 
                onClick={toggleSearch}
                Icon={MdOutlineLibraryAdd} />
              
            </div>
          </div>

          {/* TODO: Faire un composant user menu */}
          <div className="ml-auto flex justify-center gap-2">
            <Menu as="div" className="relative inline-block">
              <Menu.Button>
                <NavigationTab title={ user.username }
                  Icon={MdOutlineSupervisedUserCircle} />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md bg-gray-800 shadow-lg text-slate-300">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={signout}>
                        <MdOutlineLogout className="mr-2 h-5 w-5" />
                        Log out
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* <NavigationTab subtitle="Settings" 
              Icon={MdOutlineSettings} /> */}
          </div>
        </div>
      </div>
      { searchOpened && <Search toggleSearch={toggleSearch} /> }
    </>
  )
}

export default NavigationBar