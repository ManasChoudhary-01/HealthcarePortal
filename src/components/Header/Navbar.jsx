import "./navbar.css";
import logo from "/logo.png";
import { NavLink } from "react-router-dom";
import RoleWrapper from "../../helper/RoleWrapper";

export default function Navbar() {
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
            </div>
        </div >
    )
}