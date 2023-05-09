import PropType from "prop-types"
import Image from "next/image"

function BookCard ({ cover, title, clickAction, className = '' }) {
  return (
    <div className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`} 
      onClick={clickAction}>
      <Image src={cover} 
        fill={true} 
        sizes="100%"
        priority={true}
        className="object-cover" 
        alt={`Cover of the book ${title}`} />
      <div className="absolute bottom-0 px-2 py-2 bg-gray-900/70 hidden group-hover:block w-full">
        <p className="text-slate-100">{ title }</p>
      </div>
    </div>
  )
}

BookCard.propTypes = {
  cover: PropType.string.isRequired,
  title: PropType.string.isRequired,
  clickAction: PropType.func,
  className: PropType.string
}

export default BookCard