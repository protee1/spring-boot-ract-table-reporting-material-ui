import HttpCommon from "../HttpCommon"

const getAll=()=>{
    return HttpCommon.get("/all")

}
const create=(data)=>{
    return HttpCommon.post("/",data)

}
const getPdf=()=>{
    return HttpCommon.get("/document/pdf")

}
const getWord=()=>{
    return HttpCommon.get("/document/docx")

}
const getExcell=()=>{
    return HttpCommon.get("/document/xls")

}
export default{
    getAll,
    getPdf,
    getWord,
    getExcell,
    create
}
