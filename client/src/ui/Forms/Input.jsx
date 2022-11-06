import PropType from "prop-types"

function Input ({ type, name, inputClass, className, Icon, label, placeholder = '' }) {
  return (
    <>
      { label && <label htmlFor={name}>{label}</label> }
      <div className={`bg-gray-700 rounded flex p-1 h-9 focus-within:outline focus-within:outline-gray-800 ${className}`}>
        {Icon && <Icon className="ml-1 mr-2 my-auto text-slate-100 w-6 h-6" />}
        <input type={type}
          name={name}
          placeholder={placeholder}
          title={name} 
          className={`bg-transparent text-slate-100 outline-0 text-sm h-full my-auto ${inputClass}`} />
      </div>
    </>
  )
}

Input.propTypes = {
  type: PropType.string.isRequired,
  name: PropType.string.isRequired,
  inputClass: PropType.string,
  className: PropType.string,
  Icon: PropType.elementType,
  label: PropType.string,
  placeholder: PropType.string
}

export default Input