import PropType from "prop-types"
import { forwardRef } from "react"
import { useState } from "react";

const PageSelector = forwardRef(({ name, inputClass, className, Icon, label, onChange, value, pageMax, placeholder = '', required = false}, ref ) => {
  
  const [ page, setPage ] = useState(value || 0);

  const onChangeHandlerRange = (e) => {
    const { value } = e.target;
    setPage(value);
  }

  const onChangeHandler = (e) => {
    let { value } = e.target;
    value = parseInt(value);

    if (isNaN(value)) {
      e.target.value = 0;
      setPage(0);
      return;
    }
    value = Math.trunc(value);
    e.target.value = value;
    if (value < 0) {
      e.target.value = 0;
    }
    console.log(value, pageMax);
    if (value > pageMax) {
      e.target.value = pageMax;
    } 
    setPage(e.target.value);
  }
  
  
  return (
    <div className={`${className}`}>
      { label && <label htmlFor={name} className="text-slate-300 text-sm block mb-1">{label}</label> }
      <div className={`rounded flex px-2 py-1 h-9`}>
        {Icon && <Icon className="ml-1 mr-2 my-auto text-slate-100" />}
        <input type="Range"
          name={name}
          max={pageMax}
          min={0}
          placeholder={placeholder}
          title={name} 
          onChange={onChange ? onChange : onChangeHandlerRange}
          value={page}
          required={required}
          ref={ref}
          className={` focus:outline focus:outline-gray-600 bg-gray-700 text-slate-100 outline-2 text-sm h-full text-center my-auto w-[90%] rounded-sm ${inputClass}`} />
          <a className="w-[3%]"></a>
          <input type="text"
            name={name}
            max={pageMax}
            min={0}
            placeholder={placeholder}
            title={name} 
            onChange={onChange ? onChange : onChangeHandler}
            value={page}
            required={required}
            ref={ref}
            className={` focus:outline focus:outline-gray-600 bg-gray-700 text-slate-100 outline-2 text-sm h-full text-center my-auto w-[8%] rounded-sm ${inputClass}`} />
          <a className="flex items-center justify-around text-slate-100 w-[2%]">/</a>
          <a className="flex items-center justify-around bg-red-500 text-slate-100 text-sm h-full text-center w-[8%] rounded-sm">{pageMax ? pageMax : "/ ?"}</a>
      </div>  
    </div>
  )
})

PageSelector.displayName = "PageSelector";

PageSelector.propTypes = {
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