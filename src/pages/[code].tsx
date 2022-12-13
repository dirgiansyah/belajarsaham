import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"

moment.locale("id")

export async function getServerSideProps(context:any) {
    const {code} = context.query
    return {
      props: { code },
    }
}

const Code = ({code}:any) => {

    const [isLoading, setIsLoading] = useState(true)

    const [stock, setStock] = useState<any>()
    const [dividens, setDevidens] = useState([])

    useEffect(() => {
        getSpesificStock(code)
    },[])

    const getSpesificStock = (code:any) => {
        axios.post("/api/stock", {
            url: `Stock/GetByCode?code=${code}&username=anonymous`
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data
                getDividens(data.Id)
                setStock(data)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        }).catch((err) => {
            console.error(err)
            setIsLoading(false)
        })
    }

    const getDividens = (id:any) => {
        axios.post("/api/stock", {
            url: "StockData/GetStockDividendActions?Id="+id
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data
                setDevidens(data)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        }).catch((err) => {
            console.error(err)
            setIsLoading(false)
        })
    }

    const getClosingPrice = () => {
        axios.post("/api/stock", {
            url: "StockData/GetStockDailyClosingPrice?code=BBRI&username=anonymous"
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data
                setStock(data)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        }).catch((err) => {
            console.error(err)
            setIsLoading(false)
        })
    }

    if (!isLoading) {
        return(
            <div className="flex flex-col items-center min-h-screen py-5">
                <p className="text-3xl mb-5">{stock.Name}</p>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="p-4 bg-gray-100 border-2">No</th>
                            <th className="p-4 bg-gray-100 border-2">Deskripsi</th>
                            <th className="p-4 bg-gray-100 border-2">Rasio</th>
                            <th className="p-4 bg-gray-100 border-2">Dividen</th>
                            <th className="p-4 bg-gray-100 border-2">Currency</th>
                            <th className="p-4 bg-gray-100 border-2">Cum Date</th>
                            <th className="p-4 bg-gray-100 border-2">Record Date</th>
                            <th className="p-4 bg-gray-100 border-2">Distribution Date</th>
                            <th className="p-4 bg-gray-100 border-2">Tahun</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {isLoading
                            ? <tr><td colSpan={9} className="p-4"><div className="animate-spin inline-block w-8 h-8 border-4 border-t-black rounded-full" role="status"><span className="hidden">Loading...</span></div></td></tr>
                            : dividens.length > 0
                                ? dividens.sort((a:any,b:any) => b.Year - a.Year).map((dividen: any, idx: any) => (
                                    <tr
                                        key={idx}
                                        className="border-2"
                                        >
                                        <td className="p-4 bg-gray-100 border-2">{idx+1}</td>
                                        <td className="p-4 bg-gray-100 border-2">{dividen.Type}</td>
                                        <td className="p-4 bg-gray-100 border-2">{dividen.ExcerciseInstrument}</td>
                                        <td className="p-4 bg-gray-100 border-2">{dividen.ProceedInstrument}</td>
                                        <td className="p-4 bg-gray-100 border-2">{dividen.Currency}</td>
                                        <td className="p-4 bg-gray-100 border-2">{moment(dividen.CumDate).format("DD-MMM-YYYY")}</td>
                                        <td className="p-4 bg-gray-100 border-2">{moment(dividen.RecordDate).format("DD-MMM-YYYY")}</td>
                                        <td className="p-4 bg-gray-100 border-2">{moment(dividen.DistributionDate).format("DD-MMM-YYYY")}</td>
                                        <td className="p-4 bg-gray-100 border-2">{dividen.Year}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan={9} className="p-4 bg-gray-100 border-2">Data Tidak Ditemukan</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Code