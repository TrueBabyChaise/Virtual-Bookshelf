import PropType from "prop-types"
import { forwardRef } from "react"

const Input = forwardRef(({ type, name, inputClass, className, Icon, label, onChange, value, placeholder = '', required = false}, ref ) => {
  return (
    <div className={`${className}`}>
      { label && <label htmlFor={name} className="text-slate-300 text-sm block mb-1">{label}</label> }
      <div className={`bg-gray-700 rounded flex px-2 py-1 h-9 focus-within:outline focus-within:outline-gray-800`}>
        {Icon && <Icon className="ml-1 mr-2 my-auto text-slate-100 w-6 h-6" />}
        <input type={type}
          name={name}
          placeholder={placeholder}
          title={name} 
          onChange={onChange}
          value={value}
          required={required}
          ref={ref}
          className={`bg-transparent text-slate-100 outline-0 text-sm h-full my-auto w-full ${inputClass}`} />
      </div>
    </div>
  )
})

Input.displayName = "Input";

Input.propTypes = {
  type: PropType.string.isRequired,
  name: PropType.string.isRequired,
  onChange: PropType.func,
  value: PropType.any,
  inputClass: PropType.string,
  className: PropType.string,
  Icon: PropType.elementType,
  label: PropType.string,
  placeholder: PropType.string,
  required: PropType.bool
}

export default Input