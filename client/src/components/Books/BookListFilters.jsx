import { MdOutlineBook, 
  MdOutlineCollectionsBookmark, 
  MdOutlineSearch, 
  MdOutlineFilterAlt, 
  MdKeyboardArrowDown } from "react-icons/md"
import Input from "@ui/Forms/Input"
import TagButton from "@ui/Buttons/TagButton"
import { Popover } from "@headlessui/react"
import { useBooks } from "@src/hooks/useBooks"
import { useEffect } from "react"

function BookListFilters () {

  const { querySearch, setQuerySearch, getUserBooks } = useBooks()


  const handleTagClick = e => {
    console.log('button click')
  }

  useEffect(() => {
    getUserBooks()
  }, [querySearch])

  return (
    <div className="flex mb-5">
      <div className="flex p-1 gap-1 border-slate-100 rounded bg-gray-800">
        <TagButton title="Book" clickAction={handleTagClick} Icon={MdOutlineBook} active={true} />
        <TagButton title="Series" clickAction={handleTagClick} Icon={MdOutlineCollectionsBookmark} active={false} />
      </div>
      <div className="ml-auto flex">
        <Input type="text" value={querySearch} name="search" Icon={ MdOutlineSearch } inputClass="w-48" className="my-auto mr-4"onChange={(e) => {
          console.log('input change')
          setQuerySearch(e.target.value)    
        }}
        />
        <Popover className="relative flex">
          <Popover.Button className="flex px-2 py-1 h-9 my-auto rounded bg-slate-100 hover:bg-slate-200 text-gray-900 items-center">
            <MdOutlineFilterAlt className="mr-1" /> Filters <MdKeyboardArrowDown className="ml-4" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 right-0 top-full">
            <div className="mt-1 rounded bg-slate-100 p-2">
              <a href="/analytics">Analytics</a>
              <a href="/engagement">Engagement</a>
              <a href="/security">Security</a>
              <a href="/integrations">Integrations</a>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  )
}

export default BookListFilters