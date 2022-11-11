import { useEffect } from "react"
import Image from "next/image"

export default function SearchResultsRow ({ title, image, isbn }) {

  return (
    <div className="flex p-4 hover:bg-gray-700 ">
      <div className="h-12 w-8 relative overflow-hidden rounded">
        <Image src={image} 
          fill={true} 
          className="object-cover" 
          alt={`Cover of ${title}`} />
      </div>

      <div>
        { title }
      </div>
    </div>
  )
}