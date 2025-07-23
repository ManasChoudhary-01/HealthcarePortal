import "./navbar.css";
import logo from "/logo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="navLinks">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
                <NavLink to="/reception_register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink>
                <NavLink to="/appointment" className={({ isActive }) => (isActive ? "active" : "")}>Appointment</NavLink>
                <NavLink to="/queue" className={({ isActive }) => (isActive ? "active" : "")}>Queue</NavLink>
            </div>
        </div >
    )
}