import PropType from "prop-types"
import { forwardRef } from "react"

const Select = forwardRef(({name, options, selectClass, className, Icon, label, onChange, value, placeholder = '', required = false}, ref ) => {
  
    return (
    <div className={`${className}`}>
      { label && <label htmlFor={name} className="text-slate-300 text-sm block mb-1">{label}</label> }
        <div className={`bg-gray-700 rounded flex px-2 py-1 h-9 focus-within:outline focus-within:outline-gray-800`}>
            <select onChange={onChange} value={value} 
               className={`rounded bg-transparent text-slate-100 outline-0 text-sm h-full my-auto w-full ${selectClass}`} >
                { options.map((option) => {
                    return <option key={option.label} value={option.value}
                        className="bg-gray-700 rounded flex px-2 py-1 h-9 focus-within:outline focus-within:outline-gray-800"
                        >{option.label}
                    </option>
                })}
            </select>
        </div>
    </div>
  )
})

Select.displayName = "Select";

Select.propTypes = {
  name: PropType.string.isRequired,
  options: PropType.array.isRequired,
  onChange: PropType.func,
  value: PropType.any,
  selectClass: PropType.string,
  className: PropType.string,
  Icon: PropType.elementType,
  label: PropType.string,
  placeholder: PropType.string,
  required: PropType.bool
}

export default Select