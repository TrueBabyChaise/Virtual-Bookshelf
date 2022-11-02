import PropType from "prop-types"
import Image from "next/image"

function BookCard ({ cover, title }) {
  return (
    <div className="w-52 h-72 relative rounded-xl overflow-hidden group cursor-pointer">
      <Image src={cover} 
        fill={true} 
        className="object-cover" 
        alt={`Cover of the book ${title}`} />
      <div className="absolute bottom-0 px-2 py-2 bg-gray-900/70 hidden group-hover:block">
        <p className="text-slate-100">{ title }</p>
      </div>
    </div>
  )
}

BookCard.propTypes = {
  cover: PropType.string.isRequired,
  title: PropType.string.isRequired,
}

export default BookCard