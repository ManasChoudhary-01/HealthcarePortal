import "./navbar.css";
import logo from "/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import RoleWrapper from "../../helper/RoleWrapper";
import useAuthStore from "../../context/useAuthStore";

export default function Navbar() {

    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await logout();                     
        navigate("/", { replace: true });
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="navLinks">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>

                <RoleWrapper allowedRoles={["RECEPTIONIST"]}>
                    <NavLink to="/reception_register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink>
                </RoleWrapper>

                <NavLink to="/appointment" className={({ isActive }) => (isActive ? "active" : "")}>Appointment</NavLink>

                <RoleWrapper allowedRoles={["DOCTOR"]}>
                    <NavLink to="/queue" className={({ isActive }) => (isActive ? "active" : "")}>Queue</NavLink>
                </RoleWrapper>

                <a onClick={handleLogOut}>Log Out</a>
            </div>
        </div >
    )
}