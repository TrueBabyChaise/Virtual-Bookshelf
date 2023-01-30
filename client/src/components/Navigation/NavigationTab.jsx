import PropType from "prop-types"

function NavigationTab ({title, Icon, className = '', selected = false, onClick }) {

  const selectedStyle = 'bg-gray-800'

  return (
    <button className={`flex text-slate-100 py-3 px-3 my-1 hover:bg-gray-700 w-full rounded-lg ${className} ${selected ? selectedStyle : ''}`}
      onClick={onClick}>
      { title && (<span className="mr-2">{title}</span>) } <Icon className="w-6 h-6 mx-auto" /> 
    </button>
  )
}

NavigationTab.propTypes = {
  title: PropType.string,
  Icon: PropType.elementType.isRequired,
  className: PropType.string,
  selected: PropType.bool,
  onClick: PropType.func
}

export default NavigationTab