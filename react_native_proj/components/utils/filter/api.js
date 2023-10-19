import { Alert } from "react-native"
import axios from 'axios'
import { useEffect, useState } from "react"

const host = 'https://provinces.open-api.vn/api/'

const useFetchData = () => {

    const [provinceData, setProvinceData] = useState()

    const [err, setErr] = useState()

    const getProvince = async () => {
        try {
            const provinceName = []
            const provinces = await axios.get(host)
            provinces.data.map(item => {
                let nameProvince = item.name
                let length = nameProvince.length
                if(nameProvince.includes('Thành phố')){
                    provinceName.push(nameProvince.slice(10, length + 1))
                } else if (nameProvince.includes('Tỉnh')) {
                    provinceName.push(nameProvince.slice(5, length + 1))
                }
            })
            setProvinceData(provinceName)
        } catch (err) {
            console.log(err);
            setErr(err)
        }
    }

    useEffect(() => {
        getProvince()
    }, [])

    return {provinceData, err}

}


export default useFetchData