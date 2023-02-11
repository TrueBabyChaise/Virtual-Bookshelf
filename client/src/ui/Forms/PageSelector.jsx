import PropType from "prop-types"
import { forwardRef } from "react"

const Input = forwardRef(({ type, name, inputClass, className, Icon, label, onChange, value, pageMax, placeholder = '', required = false}, ref ) => {
  return (
    <div className={`${className}`}>
      { label && <label htmlFor={name} className="text-slate-300 text-sm block mb-1">{label}</label> }
      <div className={`bg-gray-700 rounded flex px-2 py-1 h-9 focus-within:outline focus-within:outline-gray-800`}>
        {Icon && <Icon className="ml-1 mr-2 my-auto text-slate-100" />}
        <input type={type}
          max={pageMax}
          min={0}
          name={name}
          placeholder={placeholder}
          title={name} 
          onChange={onChange}
          value={value}
          required={required}
          ref={ref}
          className={`bg-transparent text-slate-100 outline-0 text-sm h-full my-auto w-2/3 ${inputClass}`} />
        <span className="text-slate-100 text-sm my-auto ml-2 w-1/3">{pageMax ? " / " + pageMax : "/ ?"}</span>
      </div>  
    </div>
  )
})

Input.displayName = "Input";

Input.propTypes = {
  type: PropType.string.isRequired,
  name: PropType.string.isRequired,
  pageMax: PropType.number,
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