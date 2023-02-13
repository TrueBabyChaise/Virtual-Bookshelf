import PropType from "prop-types"
import { forwardRef } from "react"

const PageSelector = forwardRef(({ type, name, inputClass, className, Icon, label, onChange, value, pageMax, placeholder = '', required = false}, ref ) => {
  
  const onChangeHandler = (e) => {
    let { value } = e.target;
    value = parseInt(value);
    if (isNaN(value)) {
      e.target.value = 0;
      return;
    }
    value = Math.trunc(value);
    e.target.value = value;
    if (value < 0) {
      e.target.value = 0;
    }
    if (value > pageMax) {
      e.target.value = pageMax;
    }
  }
  
  
  return (
    <div className={`${className}`}>
      { label && <label htmlFor={name} className="text-slate-300 text-sm block mb-1">{label}</label> }
      <div className={`rounded flex px-2 py-1 h-9`}>
        {Icon && <Icon className="ml-1 mr-2 my-auto text-slate-100" />}
        <input type={type}
          name={name}
          placeholder={placeholder}
          title={name} 
          onChange={onChange ? onChange : onChangeHandler}
          value={value}
          required={required}
          ref={ref}
          className={` focus:outline focus:outline-gray-600 bg-gray-700 text-slate-100 outline-2 text-sm h-full text-center my-auto w-[50%] rounded-sm ${inputClass}`} />
          <a className="flex items-center justify-around text-slate-100 w-[10%]">/</a>
        <a className="flex items-center justify-around bg-red-500 text-slate-100 text-sm h-full text-center w-[40%] rounded-sm">{pageMax ? pageMax : "/ ?"}</a>
      </div>  
    </div>
  )
})

PageSelector.displayName = "PageSelector";

PageSelector.propTypes = {
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

export default PageSelector