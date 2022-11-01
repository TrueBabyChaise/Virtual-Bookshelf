import { MdOutlineBook } from "react-icons/md"

function NavigationTab ({title}) {
  return (
    <a href="#" className="flex text-slate-50">
      <MdOutlineBook className="w-5 h-5" /> { title }
    </a>
  )
}

export default NavigationTab