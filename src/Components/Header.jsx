import { useNavigate } from "react-router-dom";


function Header(){
    const navigate = useNavigate();

    const backHome = ()=>{
        navigate('/')
    }
    return(
        <div>
            <button onClick={backHome}>Home</button>
        </div>
    )
}

export default Header;