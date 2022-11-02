import PropType from "prop-types"

function NavigationTab ({title, Icon, className = '', selected = false}) {

  const selectedStyle = 'bg-gray-800'

  return (
    <a href="#" className={`flex text-slate-100 py-3 px-3 my-1 hover:bg-gray-700 w-full rounded-lg ${className} ${selected ? selectedStyle : ''}`}>
      <Icon className="w-6 h-6" /> <p className="ml-3 text-sm font-medium my-auto">{ title }</p>
    </a>
  )
}

NavigationTab.propTypes = {
  title: PropType.string.isRequired,
  Icon: PropType.elementType.isRequired,
  className: PropType.string,
  selected: PropType.bool
}

export default NavigationTab