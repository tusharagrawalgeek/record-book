import React from "react";
import { useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import getSelectedOption from "../functions/getSelectedOption";
import { decrypt } from "../helpers/decrypter";
function SideBar() {
  const [state, setState] = useState({
    selectedOption: getSelectedOption(),
  });
  function handleClick(e) {
    var incoming = e.target.getAttribute("name");
    setState({ selectedOption: incoming });
  }
  console.log(state.selectedOption);
  const profile = decrypt(localStorage.getItem("profile"));
// const profile='admin'
  return (
    <>
      <h4>{decrypt(localStorage.getItem("user"))}</h4>
      <div className="table-container">
        <table
          style={{
            margin: "0 3vh",
            width: "100%",
          }}
        >
          <tr>
            <Link to="/home/dashboard">
              <td
                className={
                  state.selectedOption === "dashboard"
                    ? "tr-left-selected"
                    : "tr-left"
                }
                onClick={handleClick}
                name="dashboard"
              >
                Dashboard
              </td>
            </Link>
          </tr>
          {profile === "admin" && (
            <>
              <tr>
                <Link to="/home/import">
                  <td
                    className={
                      state.selectedOption === "import"
                        ? "tr-left-selected"
                        : "tr-left"
                    }
                    onClick={handleClick}
                    name="import"
                  >
                    Import
                  </td>
                </Link>
              </tr>
              <tr>
                <Link to="/home/export">
                  <td
                    className={
                      state.selectedOption === "export"
                        ? "tr-left-selected"
                        : "tr-left"
                    }
                    onClick={handleClick}
                    name="export"
                  >
                    Export
                  </td>
                </Link>
              </tr>
              <tr>
                <Link to="/home/delete">
                  <td
                    className={
                      state.selectedOption === "delete"
                        ? "tr-left-selected"
                        : "tr-left"
                    }
                    onClick={handleClick}
                    name="delete"
                  >
                    Delete
                  </td>
                </Link>
              </tr>
              <tr>
                <Link to="/home/users">
                  <td
                    className={
                      state.selectedOption === "users"
                        ? "tr-left-selected"
                        : "tr-left"
                    }
                    onClick={handleClick}
                    name="users"
                  >
                    Users
                  </td>
                </Link>
              </tr>
            </>
          )}
          <tr>
            <Link to="/">
              <td
                className={
                  state.selectedOption === "logout"
                    ? "tr-left-selected"
                    : "tr-left"
                }
                onClick={handleClick}
                name="logout"
              >
                Logout
              </td>
            </Link>
          </tr>
        </table>
      </div>
    </>
  );
}
export default SideBar;
