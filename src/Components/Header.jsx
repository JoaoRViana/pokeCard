import { useNavigate } from "react-router-dom";


function Header(){
    const navigate = useNavigate();

    const backHome = ()=>{
        navigate('/')
    }
    return(
        <div className=" text-center mb-5">
            <button onClick={backHome} className="text-2xl styledText text-center ">Home</button>
        </div>
    )
}

export default Header;