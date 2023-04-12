import React from "react";
import { useState, useRef } from "react";
import "../style.css";
import * as color from "../colors.js";
import axios from "axios";
import url from "../vars";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import Table from "./Table.js";
import Loader from "./Loader";
import { useEffect } from "react";
import Modal from "./Modal";
import Select from "react-select";
import colourStyles from "../functions/SelectOptions";
import getCurrentInventory from "../api/getInventoryItems";
function Import() {
  const comp = useRef();
  const [state, setState] = useState({
    dateAdded: "",
    itemName: "",
    quantity: "",
    expiryDate: "",
    description: "",
    receivedFrom: "",
    receivedBy: "",
    content: "",
    colNames: [],
    bulkData: [],
    colOrder: [-1, -1, -1, -1, -1, -1, -1],
    showLoader: false,
    importedItems: [],
    showSingleUpload1: false,
    showSingleUpload2: false,
    showBulkUpload: false,
    showImportedTable: true,
    showModal: false,
    message: "",
    messageVariant: "",
    strength: "",
    dataToDisplay: [],
    existingItem: false,
    options: [],
    id:"",
    existingQuantity:0
  });
  useEffect(() => {
    if (state.existingItem) {
      const dataFetched = getCurrentInventory();
      dataFetched
        .then((data) => {
          console.log(data);
          const opts = data.map((i) => {
            return { label: i.name, value: i._id,quant:i.quantity };
          });
          setState((p) => ({ ...p, options: opts }));
        })
        .catch((err) => console.log(err));
    }
  }, [state.existingItem]);
  async function addBulkItems() {
    const promises = state.bulkData.map((i, ind) => {
      var promise = new Promise(async (resolve, reject) => {
        if (ind !== 0) {
          const data = {
            date:
              state.colOrder[0] === -1 ? state.dateAdded : i[state.colOrder[0]],
            name: state.colOrder[1] === -1 ? "" : i[state.colOrder[1]],
            receivedFrom: state.colOrder[2] === -1 ? "" : i[state.colOrder[2]],
            quantity: state.colOrder[3] === -1 ? "" : i[state.colOrder[3]],
            receivedBy: state.colOrder[4] === -1 ? "" : i[state.colOrder[4]],
            expiry: state.colOrder[5] === -1 ? "" : i[state.colOrder[5]],
            description: state.colOrder[6] === -1 ? "" : i[state.colOrder[6]],
          };
          await axios
            .post(url + "/setitem", data)
            .then((res) => {
              console.log(res.data);
              resolve("Added all the data");
            })
            .catch((err) => {
              console.log(err);
              reject("Could not add successfully");
            });
          // }
        } else {
          // console.log("here ");
          resolve("Added all the data");
        }
      });
      return promise;
    });
    return promises;
  }
  async function addSingleItem() {
    var d = new Date(state.dateAdded);
    console.log(d);
    var data = {
      name: state.itemName,
      quantity: state.quantity,
      // date:d[2]+"/"+d[1]+"/"+d[0],
      date: d.getDate() + " / " + (d.getMonth() + 1) + " / " + d.getFullYear(),
      expiry: state.expiryDate,
      description: state.description,
      receivedBy: state.receivedBy,
      receivedFrom: state.receivedFrom,
    };
    var promise = new Promise(async (resolve, reject) => {
        if(state.existingItem){
            
            await axios
        .post(url + "/setimporteditem", data)
        .then((res) => {
          console.log(res);
          data={...data, quantity:Number(state.quantity)+Number(state.existingQuantity)}
           axios
              .put(url + "/update/" + state.id, data)
              .then((res) => {
                console.log(res);
                resolve(1);
              })
              .catch((e) => {
                reject(0);
              });
          resolve("Added successfully");
        })
        .catch((err) => {
          console.log(data);
          reject("Could not add due to " + err);
        });
        }else{
            await axios
            .post(url + "/setitem", data)
        .then((res) => {
          console.log(res);
           axios
            .post(url + "/setimporteditem", data)
        .then((res) => {
          console.log(res);
          resolve("Added successfully");
        })
        .catch((err) => {
          console.log(data);
          reject("Could not add due to " + err);
        });
          resolve("Added successfully");
        })
        .catch((err) => {
          console.log(data);
          reject("Could not add due to " + err);
        });
        }
    });
    return promise;
  }
  useEffect(() => {
    if (state.strength === "single") {
      addSingleItem()
        .then((val) => {
          // console.log(val);
          setState((p) => ({
            ...p,
            showLoader: false,
            showModal: true,
            message: val,
            strength: false,
            messageVariant: "success",
            itemName: "",
            quantity: "",
            expiryDate: "",
            description: "",
            // receivedFrom:"",
            // receivedBy:"",
          }));
        })
        .catch((err) => {
          console.log(err);
          setState((p) => ({
            ...p,
            showLoader: false,
            showModal: true,
            message: err,
            strength: false,
            messageVariant: "error",
          }));
        });
    }
    if (state.strength === "bulk") {
      const allpromises = addBulkItems();
      allpromises
        .then((x) => {
          // console.log(x);
          setState((p) => ({
            ...p,
            showLoader: false,
            showModal: true,
            message: "Added all the data",
            strength: "",
            messageVariant: "success",
            colNames: [],
            bulkData: [],
            colOrder: [-1, -1, -1, -1, -1, -1, -1],
          }));
        })
        .catch((err) => {
          // console.log(err);
          setState((p) => ({
            ...p,
            showLoader: false,
            showModal: true,
            message: "Could not add items",
            strength: "",
            messageVariant: "error",
          }));
        });
    }
  }, [state.strength]);
  useEffect(() => {
    if (state.showModal) {
      setTimeout(() => {
        setState((p) => ({
          ...p,
          showModal: false,
          message: "",
          messageVariant: "",
        }));
      }, 3000);
    }
  }, [state.showModal]);

  function closeModalCallback() {
    // console.log("Callback");
    setState((p) => ({
      ...p,
      showModal: false,
      message: "",
      messageVariant: "",
    }));
  }
  
  async function loadImportedItems() {
    await axios.get(url + "/getimporteditems").then((res) => {
      console.log("function called", res);
      setState((p) => ({
        ...p,
        importedItems: res.data.data,
      }));
    });
  }
  useEffect(() => {
    loadImportedItems();
  }, []);
  function handleOptionChange(e) {
    var obj = e.target;
    state.colOrder[[obj.name]] = Number(obj.value);
    setState((p) => {
      return {
        ...p,
      };
    });
  }
  function handleChange(e) {
    var obj = e.target;
    if (obj.name === "expiryDate") {
      var value = obj.value;
      if (state.expiryDate.length === 1) {
        value = value + " / ";
      }
      setState((p) => {
        return {
          ...p,
          [obj.name]: value,
        };
      });
    } else
      setState((p) => {
        return {
          ...p,
          [obj.name]: obj.value,
        };
      });
  }
  function handleSubmit(e) {
    if (e.target.getAttribute("name") === "singleAddButton") {
      setState((p) => ({
        ...p,
        strength: "single",
        showLoader: true,
      }));
      return;
    }
    if (e.target.getAttribute("name") === "bulkAddButton") {
      setState((p) => ({
        ...p,
        strength: "bulk",
        showLoader: true,
      }));
      return;
    }
  }
  function proceedButton() {
    var arr = {
      showSingleUpload1: false,
      showSingleUpload2: false,
      showBulkUpload: false,
      showImportedTable: false,
    };
    setState((p) => ({
      ...p,
      ...arr,
      showSingleUpload2: true,
    }));
  }
  function handleClick(e) {
    var obj = e.target.getAttribute("name");
    var arr = {
      showSingleUpload1: false,
      showSingleUpload2: false,
      showBulkUpload: false,
      showImportedTable: false,
    };
    loadImportedItems();
    setState((p) => {
      return {
        ...p,
        ...arr,
        [obj]: !state[obj],
        itemName: "",
        quantity: "",
        expiryDate: "",
        description: "",
        receivedFrom: "",
        receivedBy: "",
        content: "",
        colNames: [],
        bulkData: [],
        colOrder: [-1, -1, -1, -1, -1, -1, -1],
      };
    });
  }
  function fileHandler(event) {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(resp.cols,resp.rows);
        const data = resp.rows;
        const colNames = data[0];
        setState((p) => {
          return {
            ...p,
            colNames: colNames,
            bulkData: data,
          };
        });
      }
    });
  }
  return (
    <>
      {" "}
      {console.log(state.options)}
      <Loader show={state.showLoader} />
      <Modal
        message={state.message}
        type={state.messageVariant}
        show={state.showModal}
        closeCallback={closeModalCallback}
      />
      <div
        style={{
          width: "100%",
        }}
      >
        <div>
          <h2
            style={{ marginTop: "0", color: color.contrast, marginBottom: "0" }}
          >
            {state.showImportedTable
              ? "IMPORTED ITEMS"
              : state.showSingleUpload1
              ? "ADD SINGLE ITEM"
              : state.showSingleUpload2
              ? "ADD SINGLE ITEM"
              : "BULK UPLOAD ITEMS"}
          </h2>
          <text style={{ fontSize: ".8em" }}>
            <em>
              {state.showImportedTable
                ? "Here you can see the items imported in the past 30 days even if they are not in the inventory currently. Items after 30 days are automatically removed"
                : state.showSingleUpload1 || state.showSingleUpload2
                ? "Fill the details and the item will be added instantly to the inventory. To upload many items at once, go to Bulk Upload Items"
                : "Insert an excel file from your system and choose the column name from dropdown which corresponds to the actual columns"}
            </em>
          </text>
        </div>
        <div
          name="contain"
          style={{
            margin: "auto",
            marginTop: "1em",
          }}
        >
          {state.showImportedTable ? (
            <>
              <div ref={comp} style={{ display: "none" }}>
                Table here
              </div>
              <div
                name="container"
                style={{ textAlign: "center", display: "block" }}
              >
                <div className="singlebar">
                  <Table items={state.importedItems} searchBar />
                 
                  {state.showImportedTable && (
                    <button
                      style={{ float: "" }}
                      className="btn-add1"
                      name="showSingleUpload1"
                      onClick={handleClick}
                    >
                      Upload items
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <table
              style={{
                margin: "auto",
                width: "70%",
                padding: "2em",
                borderSpacing: "0",
                borderRadius: "2px",
                background: "#2E333C",
                boxShadow: "1px 1px 2px 0px black",
              }}
            >
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "right", paddingRight: "10px" }}
                >
                  <button
                    className="btn-add"
                    style={{ color: "grey" }}
                    name={
                      state.showBulkUpload
                        ? "showSingleUpload1"
                        : "showImportedTable"
                    }
                    onClick={handleClick}
                  >
                    X
                  </button>
                </td>
              </tr>
              {state.showSingleUpload1 ? (
                <>{preEntryForm()}</>
              ) : state.showSingleUpload2 ? (
                <>{entryForm()}</>
              ) : (
                <>
                  <>
                    <tr>
                      <td className="tditem">Select an excel file</td>
                      <td className="tditem">:</td>
                      <td className="tditem">
                        <input
                          type="file"
                          className="inputitem"
                          id="fileUpload"
                          // value={state.itemName}
                          onChange={fileHandler}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="tditem">DATE ADDED</td>
                      <td className="tditem">:</td>
                      <td className="tditem">
                        <select
                          className="inputitem"
                          style={{ background: "#2E333C" }}
                          onChange={handleOptionChange}
                          name={0}
                          id="quantityOption"
                        >
                          <option value={-1}>{state.dateAdded}</option>
                          {state.colNames.map((i, ind) => {
                            return <option value={ind}>{i}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tditem">PARTICULAR</td>
                      <td className="tditem">:</td>
                      <td className="tditem">
                        <select
                          className="inputitem"
                          style={{ background: "#2E333C" }}
                          onChange={handleOptionChange}
                          name={1}
                          id="itemNameOption"
                        >
                          <option value={-1}>--Select column name--</option>
                          {state.colNames.map((i, ind) => {
                            return <option value={ind}>{i}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tditem">RECEIVE FROM</td>
                      <td className="tditem">:</td>
                      <td className="tditem">
                        <select
                          className="inputitem"
                          style={{ background: "#2E333C" }}
                          onChange={handleOptionChange}
                          name={2}
                          id="receivedFromOption"
                        >
                          <option value={-1}>--Select an option--</option>
                          {state.colNames.map((i, ind) => {
                            return <option value={ind}>{i}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tditem">QUANTITY</td>
                      <td className="tditem">:</td>
                      <td className="tditem">
                        <select
                          className="inputitem"
                          style={{ background: "#2E333C" }}
                          onChange={handleOptionChange}
                          name={3}
                          id="quantityOption"
                        >
                          <option value={-1}>--Select column name--</option>
                          {state.colNames.map((i, ind) => {
                            return <option value={ind}>{i}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tditem">RECEIVED BY</td>
                      <td className="tditem">:</td>
                      <td className="tditem">
                        <select
                          className="inputitem"
                          style={{ background: "#2E333C" }}
                          onChange={handleOptionChange}
                          name={4}
                          id="receivedByOption"
                        >
                          <option value={-1}>--Select an option--</option>
                          {state.colNames.map((i, ind) => {
                            return <option value={ind}>{i}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tditem">EXPIRY DATE</td>
                      <td className="tditem">:</td>
                      <td className="tditem">
                        <select
                          className="inputitem"
                          style={{ background: "#2E333C" }}
                          onChange={handleOptionChange}
                          name={5}
                          id="quantityOption"
                        >
                          <option value={-1}>--Select column name--</option>
                          {state.colNames.map((i, ind) => {
                            return <option value={ind}>{i}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tditem">DESCRIPTION</td>
                      <td className="tditem">:</td>
                      <td className="tditem">
                        <select
                          className="inputitem"
                          style={{ background: "#2E333C" }}
                          onChange={handleOptionChange}
                          name={6}
                          id="quantityOption"
                        >
                          <option value={-1}>--Select column name--</option>
                          {state.colNames.map((i, ind) => {
                            return <option value={ind}>{i}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="td-add-btn">
                        <button
                          className="btn-add"
                          onClick={handleSubmit}
                          name="bulkAddButton"
                        >
                          Add Items
                        </button>
                      </td>
                    </tr>
                  </>
                </>
              )}
            </table>
          )}
        </div>
        <>
          {state.showSingleUpload1 && (
            <div style={{ padding: "20px", width: "100%" }}>
              <button
                name="showBulkUpload"
                className="btn-add"
                onClick={handleClick}
              >
                Bulk Upload Items
              </button>
            </div>
          )}
        </>
      </div>
      {/* {console.log("Exited the function")} */}
    </>
  );
  function entryForm() {
    return (
      <>
        <tr>
          <td colSpan={3}>
            <h2 style={{ padding: "0" }}>
              Received from
              {" " + state.receivedFrom}
            </h2>
          </td>
        </tr>
        <tr>
          <td className="tditem">Is this an existing item?</td>
          <td className="tditem">:</td>
          <td className="tditem">
            <input
              type="radio"
              className="radiobtn"
              name="existingItem"
              onClick={() =>
                setState((p) => ({
                  ...p,
                  existingItem: true,
                }))
              }
              checked={state.existingItem}
            />
            Yes
            <input
              type="radio"
              className="radiobtn"
              name="existingItem"
              // value={false}
              onClick={() =>
                setState((p) => ({
                  ...p,
                  existingItem: false,
                }))
              }
              checked={!state.existingItem}
            />
            No
          </td>
        </tr>
        <tr>
          <td className="tditem">PARTICULAR</td>
          <td className="tditem">:</td>
          <td className="tditem">
            {state.existingItem ? (
              <Select
                options={state.options}
                styles={colourStyles}
                onChange={e=>setState(p=>({...p,itemName:e.label,id:e.value,existingQuantity:e.quant}))}
                isOptionDisabled={(option) => option.disabled}
              />
            ) : (
              <input
                className="inputitem"
                name="itemName"
                value={state.itemName}
                onChange={handleChange}
              />
            )}
          </td>
        </tr>

        <tr>
          <td className="tditem">QUANTITY</td>
          <td className="tditem">:</td>
          <td className="tditem">
            <input
              className="inputitem"
              name="quantity"
              value={state.quantity}
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <td className="tditem">EXPIRY DATE</td>
          <td className="tditem">:</td>
          <td className="tditem">
            <input
              className="inputitem"
              name="expiryDate"
              value={state.expiryDate}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td className="tditem">REMARKS</td>
          <td className="tditem">:</td>
          <td className="tditem">
            <input
              className="inputitem"
              name="description"
              value={state.description}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="3" className="td-add-btn">
            <button
              className="btn-add"
              onClick={handleSubmit}
              name="singleAddButton"
            >
              Add
            </button>
          </td>
        </tr>
      </>
    );
  }
  function preEntryForm() {
    return (
      <>
        <tr>
          <td className="tditem">DATE</td>
          <td className="tditem">:</td>
          <td className="tditem">
            <input
              type="date"
              className="inputitem"
              name="dateAdded"
              value={state.dateAdded}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td className="tditem">RECEIVED FROM</td>
          <td className="tditem">:</td>
          <td className="tditem">
            <input
              className="inputitem"
              name="receivedFrom"
              value={state.receivedFrom}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td className="tditem">RECEIVED BY</td>
          <td className="tditem">:</td>
          <td className="tditem">
            <input
              className="inputitem"
              name="receivedBy"
              value={state.receivedBy}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="3" className="td-add-btn">
            <button
              className="btn-add"
              onClick={proceedButton}
              name="showSingleUpload2"
            >
              Proceed
            </button>
          </td>
        </tr>
      </>
    );
  }
}
export default Import;
