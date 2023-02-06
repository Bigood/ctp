import { memo, ReactElement, useRef, useState } from "react";

import debounce from "lodash/debounce";
import { ControllerRenderProps, InputFieldProps } from "@redwoodjs/forms";

interface AutocompleteProps extends InputFieldProps {
  defaultValue?: string
  dataSource: any[]
  placeholder: string
  onSearch(val: string): void
  onSelect(item: any): void
  resultKey: string
  loading: boolean
};

//we are using dropdown, input and menu component from daisyui
const Autocomplete = (props: AutocompleteProps) => {
  const { defaultValue, onSearch, dataSource, onSelect, resultKey } = props
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const _onSearch = debounce((value) => onSearch(value), 1000)
  const renderOption = (item, index) => (
    item ? <li
      key={item[resultKey]}
      tabIndex={index + 1}
      onClick={() => {
        setOpen(false)
        onSelect(item)
        setValue(item[resultKey])
      }}
      className="w-full border-b border-b-base-content/10"
    >
      <div>{item[resultKey]}</div>
    </li> : null

  )
  return (
    <div className={`dropdown w-full  ${!!open && 'dropdown-open'}`} ref={ref}>
      <div className="relative">
        <input
          type="text"
          name={props.name}
          className="input-bordered input w-full"
          value={value}
          onChange={(e)=> {
            setValue(e.target.value)
            props?.onChange(e)
            _onSearch(e.target.value)
          }}
          placeholder={props.placeholder || 'Type something..'}
          tabIndex={0}
        />
        {props.loading && <Spinner className="absolute right-2 top-2" />}
        {/* {value && <span className="absolute right-4 top-2" onClick={() => setValue("")}>x</span>} */}
      </div>
      <div className="dropdown-content top-14 max-h-96 flex-col overflow-auto rounded-md bg-base-200">
        <ul
          className="menu menu-compact "
          // use ref to calculate the width of parent
          style={{ width: ref.current?.clientWidth }}
        >
          {dataSource.map(renderOption)}
        </ul>
      </div>
    </div>
  )
};
export default memo(Autocomplete);

const Spinner = (props)=>(
  <div role="status" {...props}>
    <svg
      aria-hidden="true"
      className="mr-2 inline h-4 w-4 animate- spin fill-blue-600 text-gray-200 dark:text-gray-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
)