import PropType from "prop-types"

function TagButton ({ title, clickAction, Icon, className, active }) {
  const styles = {
    active: 'bg-slate-100 text-gray-900',
    nonActive: 'bg-gray-800 text-slate-100 hover:bg-gray-700'
  }

  return (
    <button onClick={clickAction}
      className={`px-2 py-1 min-w-[5rem] rounded flex items-center ${className} ${active ? styles.active : styles.nonActive}`}>
        { Icon && <Icon className="mr-1" /> }
        { title }
      </button>
  )

}

TagButton.propTypes = {
  title: PropType.string.isRequired,
  Icon: PropType.elementType,
  className: PropType.string,
  active: PropType.bool,
}

export default TagButton