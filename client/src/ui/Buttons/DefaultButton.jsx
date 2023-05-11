import PropType from "prop-types"

function DefaultButton ({ title, clickAction, Icon, className, type, ...props }) {

  return (
    <button onClick={clickAction}
      type={type}
      className={`px-2 py-1 min-w-[5rem] rounded flex justify-center items-center bg-slate-100 text-gray-900 ${className}`} {...props}>
        { Icon && <Icon className="mr-1" /> }
        { title }
      </button>
  )

}

DefaultButton.propTypes = {
  title: PropType.string.isRequired,
  Icon: PropType.elementType,
  className: PropType.string,
  type: PropType.string
}

export default DefaultButton