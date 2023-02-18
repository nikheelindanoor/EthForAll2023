import React from "react";
import styles from "./Plots.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import Modal from "react-modal";
// import CloseIcon from "@mui/icons-material/Close";
import MoonLoader from "react-spinners/MoonLoader";

const Plots = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      creatorId: 1,
      name: "Sundaram heights",
      realAdd: "Mumbai",
      xCor: "19 N",
      yCor: "19 S",
      totalQuantity: 100,
      availableStocks: 80,
      price: 100000,
      rented: false,
      rentAmount: 1000,
    },
    {
      id: 1,
      creatorId: 1,
      name: "Sundaram heights",
      realAdd: "Mumbai",
      xCor: "19 N",
      yCor: "19 S",
      totalQuantity: 100,
      availableStocks: 80,
      price: 100000,
      rented: false,
      rentAmount: 1000,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const [stockId, setStockId] = useState();
  const [address, setAddress] = useState("");
  const [buyQuantity, setBuyQuantity] = useState();
  const [buyPrice, setBuyPrice] = useState();
  const [plotId, setPlotId] = useState();
  const [sellQuantity, setSellQuantity] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);

  function closeModal() {
    setModalIsOpen(false);
  }
  function closeModal2() {
    setModalIsOpen2(false);
  }

  const openModal = async (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };
  const openModal2 = async (e) => {
    e.preventDefault();
    setModalIsOpen2(true);
  };

  return (
    <>
      <div className={styles.detailsBox}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Buy stocks"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <div className={styles.modalContainer}>
            <button className={styles.closeButton} onClick={closeModal}>
              {/* <CloseIcon /> */}
            </button>
            <h2
              className={styles.heading}
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              Details
            </h2>

            <form className={styles.formBox}>
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.input}`}
                  style={{
                    resize: "none",
                  }}
                  type="number"
                  placeholder="Stock ID"
                  onChange={(e) => setStockId(e.target.value)}
                  value={stockId}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.input}`}
                  style={{
                    resize: "none",
                  }}
                  type="text"
                  placeholder="Creator's address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.input}`}
                  style={{
                    resize: "none",
                  }}
                  type="number"
                  placeholder="Quantity to buy"
                  onChange={(e) => setBuyQuantity(e.target.value)}
                  value={buyQuantity}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.input}`}
                  style={{
                    resize: "none",
                  }}
                  type="number"
                  placeholder="Price"
                  onChange={(e) => setBuyPrice(e.target.value)}
                  value={buyPrice}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.input}`}
                  style={{
                    resize: "none",
                  }}
                  type="number"
                  placeholder="Plot ID"
                  onChange={(e) => setPlotId(e.target.value)}
                  value={plotId}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.input}`}
                  style={{
                    resize: "none",
                  }}
                  type="number"
                  placeholder="Sell Quantity"
                  onChange={(e) => setSellQuantity(e.target.value)}
                  value={sellQuantity}
                />
              </div>

              <button
                className={`${styles.modalIssueBtn}`}
                // onClick={handleSubmit}
              >
                {isLoading ? (
                  <MoonLoader
                    className={styles.loader}
                    color="white"
                    size={20}
                  />
                ) : (
                  "Buy"
                )}
              </button>
            </form>
          </div>
        </Modal>
        <span className={styles.heading}>All Plots</span>
        <div className={styles.eventPageBody}>
          {/* <div className={styles.searchEventsContainer}>
          <div className={`${styles.inputContainer}`}>
            <div className={styles.searchEventsTitle}>
              Search Plot by{" "}
              <select
                onChange={(e) => {
                  // setSearchId(e.target.value);
                  // handleChangeSearchId2(e);
                }}
                className={`${styles.input}`}
              >
                {/* <option key={0}></option> */}
          {/* {detailsList.map((value, id) => {
                  return <option key={id}>{value}</option>;
                })} 
              </select>
            </div>
          </div>
          <div className={`${styles.inputContainer2}`}>
            {`${searchId}` == "docName" ||
            `${searchId}` == "department" ||
            `${searchId}` == "reqType" ? (
              <select
                onChange={(e) => setSearchInput(e.target.value)}
                className={`${styles.input2}`}
              >
                {/* <option key={0}></option> 
                {searchIdList.map((value, id) => {
                  return <option key={id}>{value}</option>;
                })}
              </select>
            ) : (
              <input
                className={styles.eventSearchInput}
                type="text"
                placeholder={`Search ${searchId}`}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
            )}

            <button
              className={styles.requestFileBtn}
              onClick={(e) => handleSearchInput(e)}
            >
              Search
            </button>
          </div> 
        </div>*/}
          <div className={styles.exploreEventsContainer}>
            <div className={styles.eventsListGrid}>
              {data.map((request, id) => {
                return (
                  <div id={id} className={styles.eventBox}>
                    <div className={styles.eventName}>
                      <span>
                        Plot ID:{" "}
                        <span className={styles.values}>{request.id}</span>
                      </span>
                    </div>
                    <div className={styles.eventName}>
                      <span>
                        Creator Id:{" "}
                        <span className={styles.values}>
                          {request.creatorId}
                        </span>
                      </span>
                    </div>
                    <div className={styles.eventName}>
                      <span>
                        Plot name:{" "}
                        <span className={styles.values}>{request.name}</span>
                      </span>
                    </div>
                    <div className={styles.eventName}>
                      <span>
                        Real Address:{" "}
                        <span className={styles.values}>{request.realAdd}</span>
                      </span>
                    </div>
                    <div className={styles.eventName}>
                      <span>
                        Coordinates:{" "}
                        <span className={styles.values}>
                          {request.xCor} {request.yCor}
                        </span>
                      </span>
                    </div>
                    <div className={styles.eventName}>
                      <span>
                        Total Quantity:{" "}
                        <span className={styles.values}>
                          {request.totalQuantity}
                        </span>
                      </span>
                    </div>
                    <div className={styles.eventName}>
                      <span>
                        Buyable Quantity:{" "}
                        <span className={styles.values}>
                          {request.availableStocks}
                        </span>
                      </span>
                    </div>
                    <div className={styles.eventName}>
                      <span>
                        Price:{" "}
                        <span className={styles.values}>{request.price}</span>
                      </span>
                    </div>
                    <div className={styles.eventName}>
                      <span>
                        Rent Amount:{" "}
                        <span className={styles.values}>
                          {request.rentAmount}
                        </span>
                      </span>
                    </div>
                    <div className={styles.buttonBox}>
                      <div>
                        <button
                          onClick={(e) => {
                            openModal(e);
                            // set_ReqId(request.reqId);
                          }}
                          className={styles.issueBtn}
                        >
                          <span>Buy Stocks</span>
                        </button>
                      </div>

                      <div>
                        <button
                          onClick={(e) => {
                            // openModal2(e);
                            // set_ReqId(request.reqId);
                            // set_Email(request.emailId);
                          }}
                          className={styles.rejectBtn}
                        >
                          <span>Rent plot</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plots;
