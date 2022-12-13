import Modals from "../../components/utils/Modals"
import { useState } from "react"
import router from "next/router"

const ListView = ({
    stocks,
    loading,
    searchCondition,
    ref
}: any) => {

    const [showModals, setShowModals] = useState(false)
    const [dataModals, setDataModals] = useState({})

    return(
        <div className="min-h-screen flex flex-col items-center py-5" ref={ref}>
            <h2 className="text-3xl font-bold mb-4">Daftar Saham</h2>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="p-4 bg-gray-100 border-2">No</th>
                        <th className="p-4 bg-gray-100 border-2">Kode</th>
                        <th className="p-4 bg-gray-100 border-2">Perusahaan</th>
                        <th className="p-4 bg-gray-100 border-2">Sektor</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {loading
                        ? <tr><td colSpan={4} className="p-4"><div className="animate-spin inline-block w-8 h-8 border-4 border-t-black rounded-full" role="status"><span className="hidden">Loading...</span></div></td></tr>
                        : stocks.filter((d: any) => searchCondition(d)).length > 0
                            ? stocks.filter((d: any) => searchCondition(d)).map((stock: any, idx: any) => (
                                <tr
                                    key={idx}
                                    className="border-2 bg-gray-100 hover:bg-gray-200"
                                    role="button"
                                    onClick={() => {
                                        router.push("/"+stock.Code)
                                        // setShowModals(true)
                                        // setDataModals(stock)
                                    }}
                                    >
                                    <td className="p-4 border-2">{idx+1}</td>
                                    <td className="p-4 border-2">{stock.Code}</td>
                                    <td className="p-4 border-2">{stock.Name}</td>
                                    <td className="p-4 border-2">{stock.NewSectorName}</td>
                                </tr>
                            ))
                            : <tr><td colSpan={4} className="p-4 bg-gray-100 border-2">Data Tidak Ditemukan</td></tr>
                    }
                </tbody>
            </table>
            {/* <Modals.DetailStock data={dataModals} show={showModals} hide={() => setShowModals(false)} /> */}
        </div>
    )
}

export default ListView