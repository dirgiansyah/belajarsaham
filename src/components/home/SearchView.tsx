import gsap from 'gsap'
import {AiOutlineSearch} from 'react-icons/ai'

const SearchView = ({
    searchValue,
    searchAction,
    ref
}: any) => {

    const scaleUpSearch = ({currentTarget}: any) => {
      gsap.to(currentTarget, {scale: 1.1})
    }
  
    const scaleDownSearch = ({currentTarget}: any) => {
      gsap.to(currentTarget, {scale: 1})
    }

    return(
        <div className="relative h-screen bg-black flex justify-center items-center" ref={ref}>
            {/* <div className="absolute top-0 left-0 right-0 p-5 flex justify-end gap-4 text-white">
                <p role="button">List</p>
                <p role="button">Keyword</p>
            </div> */}
            <div className="relative text-gray-600 focus-within:text-gray-400" onFocus={scaleUpSearch} onBlur={scaleDownSearch}>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <AiOutlineSearch
                    role="button"
                    size={24}
                />
                </span>
                <input
                    type="text"
                    className="sm:w-96 w-full py-3 text-sm text-white bg-gray-900 rounded-3xl pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                    placeholder="Masukkan kode saham"
                    autoComplete="off"
                    value={searchValue}
                    onChange={searchAction}
                />
            </div>
        </div>
    )
}

export default SearchView