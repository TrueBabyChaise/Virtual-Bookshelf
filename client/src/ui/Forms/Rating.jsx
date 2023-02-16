import PropType from "prop-types"
import { forwardRef } from "react"

const Rating = forwardRef(({name, inputClass, className, label, onChange, value, setValue}, ref ) => {
 
    const activeStarClass = "text-yellow-400";
    const inactiveStarClass = "text-gray-300 dark:text-gray-500";
    const onHoverStarClass = "hover:h-[100%]";
    const pathStar = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"

    const handleClick = (e) => {
        let { id } = e.target;
        id = parseInt(id);
        setValue(id);
    }

    return (
    <div className={`${className}`}>
      { label && <label htmlFor={name} className="text-slate-300 text-sm block mb-1">{label}</label> }
        <div className="flex items-center h-[100%]">
            <svg id={0} onClick={handleClick} aria-hidden="true" className={"w-[20%] h-[50%] " + (value > 0 ? activeStarClass : inactiveStarClass) + " " + onHoverStarClass} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>1</title><path id={1} d={pathStar}></path></svg>
            <svg id={1} onClick={handleClick} aria-hidden="true" className={"w-[20%] h-[50%] " + (value > 1 ? activeStarClass : inactiveStarClass) + " " + onHoverStarClass} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>2</title><path id={2} d={pathStar}></path></svg>
            <svg id={2} onClick={handleClick} aria-hidden="true" className={"w-[20%] h-[50%] " + (value > 2 ? activeStarClass : inactiveStarClass) + " " + onHoverStarClass} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>3</title><path id={3} d={pathStar}></path></svg>
            <svg id={3} onClick={handleClick} aria-hidden="true" className={"w-[20%] h-[50%] " + (value > 3 ? activeStarClass : inactiveStarClass) + " " + onHoverStarClass} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>4</title><path id={4} d={pathStar}></path></svg>
            <svg id={4} onClick={handleClick} aria-hidden="true" className={"w-[20%] h-[50%] " + (value > 4 ? activeStarClass : inactiveStarClass) + " " + onHoverStarClass} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>5</title><path id={5} d={pathStar}></path></svg>
        </div>
    </div>
  )
})

Rating.displayName = "Rating";

Rating.propTypes = {
  name: PropType.string.isRequired,
  onChange: PropType.func,
  value: PropType.any,
  setValue: PropType.func,
  inputClass: PropType.string,
  className: PropType.string,
  label: PropType.string,
}

export default Rating