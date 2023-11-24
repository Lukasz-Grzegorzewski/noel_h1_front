import { Link } from "react-router-dom";

function Header({ handleLogout }) {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-end pr-10 gap-10 bg-emerald-800 p-3">
      {localStorage.getItem("userId") && (
        <>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-xl">
            Logout {localStorage.getItem("name")}
          </button>

          <Link to="/" className="bg-emerald-500 text-white p-2 rounded-xl">HOME</Link>
          <Link to="/recordings" className="bg-emerald-500 text-white p-2 rounded-xl">View Recordings</Link>
        </>
      )}
    </div>
  );
}

export default Header;
