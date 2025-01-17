import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const TableHeading = ({name, children, sortable=true, sortChanged = () => {}, sortColumn=null, sortDirection=null }) => {
  return (

    <th onClick={e => sortChanged(name)} className="px-3 py-2 cursor-pointer">
      <div className="flex justify-between gap-1 items-center">
        {children}
        {
        sortable &&        
          <div>
            <ChevronUpIcon className={"w-4 " + (sortColumn == name && sortDirection == 'desc' ? "text-gray-200 !w-5" : "text-black") }  style={ {marginLeft: sortDirection !== "desc" && sortColumn == name ? "2px" : "0px"}}/>
            <ChevronDownIcon className={"w-4 -my-1 " + (sortColumn == name && sortDirection == 'asc' ? "text-gray-200 !w-5" : "text-black") }  style={ {marginLeft: sortDirection !== "asc" && sortColumn == name ? "2px" : "0px"}}/>
          </div>
        }
      </div>
    </th>

  )
}

export default TableHeading