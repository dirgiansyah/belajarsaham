import { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'

import axios from 'axios'

import ListView from '../components/home/ListView'
import SearchView from '../components/home/SearchView'

const Home: NextPage = () => {

  const [isLoading, setIsLoading] = useState(true)

  const searchView = useRef<HTMLDivElement>(null)
  const listView = useRef<HTMLDivElement>(null)

  const [stocks, setStocks] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    axios.get("/api/stock")
      .then((res) => {
        if (res.status === 200) {
            let data = res.data
            setStocks(data)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
        }).catch((err) => {
            console.error(err)
            setIsLoading(false)
        })
  }

  return(
    <div>
        <SearchView
            ref={searchView}
            searchValue={search}
            searchAction={(e: any) => {
                let value = e.currentTarget.value
                setSearch(value)
            }}
        />
        <ListView
            ref={listView}
            stocks={stocks}
            loading={isLoading}
            searchCondition={(d: any) => search ? d.Code == search || d.Name.includes(search) : d}
        />
    </div>
  )
}

export default Home