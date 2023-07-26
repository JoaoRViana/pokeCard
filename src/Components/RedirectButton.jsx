import { useNavigate } from "react-router-dom"

export default function RedirectButton(props){
    const {path,text} = props
    const navigate = useNavigate();
    return(
        <div>
        <button onClick={()=>{
            navigate(`/${path}`)
        }}>{text}</button>
        </div>
    )
}