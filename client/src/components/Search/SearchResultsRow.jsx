import { useEffect } from "react"
import Image from "next/image"
import { MdOutlineNoPhotography } from "react-icons/md" 

export default function SearchResultsRow ({ title, image, isbn }) {

  return (
    <div className="flex px-4 py-3 hover:bg-gray-800 cursor-pointer ">
      <div className="h-12 w-8 relative overflow-hidden rounded">
        { image ? (
          <Image src={image} 
          fill={true} 
          className="object-cover" 
          alt={`Cover of ${title}`} />
        ) : (
          <div className="bg-gray-700 w-full h-full flex">
            <MdOutlineNoPhotography className="m-auto text-gray-300" />
          </div>  
        )}
        
      </div>

      <div className="my-auto ml-2">
        <p className="text-gray-300 text-sm">
          { title }
        </p>
        <p className="text-gray-400 text-xs">
          { isbn }
        </p>
      </div>
    </div>
  )
}