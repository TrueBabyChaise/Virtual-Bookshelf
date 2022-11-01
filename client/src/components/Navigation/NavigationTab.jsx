import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBooks } from "@fortawesome/pro-regular-svg-icons"

function NavigationTab ({title}) {
  return (
    <a href="#" className="flex text-slate-50">
      <FontAwesomeIcon icon={faBooks} className="w-3" /> { title }
    </a>
  )
}

export default NavigationTab