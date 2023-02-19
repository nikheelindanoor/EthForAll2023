import React from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import { useSmartEstateContext } from "../../Context/SmartEstateContext";
import Modal from "react-modal";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    currentAccount,
    connectUsingArcana,
    fetchUserByAddress,
    fetchAllStocksForUser,
    fetchMySellings,
    sellPlot
  } = useSmartEstateContext();
  const [user, setUser] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [sellings, setSellings] = useState([]);
  const [isSellPlotModalOpen, setIsSellPlotModalOpen] = useState(false);
  const [plotName, setPlotName] = useState("");
  const [plotAddress, setPlotAddress] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [availableStocks, setAvailableStocks] = useState("");
  const [yCor, setYCor] = useState("");
  const [xCor, setXCor] = useState("");

  // {/* string memory name,
  //       string memory realAdd,
  //       string memory xCor,
  //       string memory yCor,
  //       uint256 totalQuantity,
  //       uint256 availableStocks,
  //       uint256 price,
  //       uint256 rentAmount */}

  const handlePlotSellBtn = async (e) => {
    // write code to upload a new plot for selling
    // e.preventDedault();
      try {
        console.log("Adding Plot!===================================")
        await sellPlot(plotName, plotAddress, xCor, yCor, totalQuantity, availableStocks, sellingPrice, rentAmount);
        console.log("Plot Added!!!");
      } catch (error) {
        console.log("kworowjrwjrowjro9999--------------------------------------------------")
        console.log(error);
      }
    }


  const fetchUser = useCallback(async () => {
    try {
      const data = await fetchUserByAddress(currentAccount);
      setUser(data);
    } catch (err) {
      // navigate("/regiser");
    }
  });

  const fetchHoldings = useCallback(async () => {
    try {
      const data = await fetchAllStocksForUser(currentAccount, user.name);
      setHoldings(data);
    } catch (err) {
      console.log(err);
    }
  });

  const fetchSellings = useCallback(async () => {
    try {
      const data = await fetchMySellings(currentAccount);
      setSellings(data);
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    if (currentAccount === "") {
      console.log("connecting with wallet");
      connectUsingArcana();
    } else {
      // fetchUser();
      // fetchHoldings();
      // fetchSellings();
    }
  }, [currentAccount]);

  const handleNavigateToPlots = () => {
    navigate("/plots");
  };

  const refreshPage = () => {
    fetchUser();
    fetchAllStocksForUser();
    fetchHoldings();
    fetchSellings();
  };

  const handleSellPlotModalOpen = () => {
    setIsSellPlotModalOpen(true);
  };

  const handleSellPlotModalClose = () => {
    setIsSellPlotModalOpen(false);
  };



  return (
    <>
      <Modal
        isOpen={isSellPlotModalOpen}
        onRequestClose={handleSellPlotModalClose}
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
          <button className={styles.closeButton} onClick={handleSellPlotModalClose}>
            x
          </button>
          <h2
            className={styles.heading}
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            Plot Details
          </h2>

          <div className={styles.formBox}>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="text"
                placeholder="Plot Name"
                onChange={(e) => setPlotName(e.target.value)}
                value={plotName}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="text"
                placeholder="Plot Address"
                onChange={(e) => setPlotAddress(e.target.value)}
                value={plotAddress}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="Percent to distribute"
                onChange={(e) => setTotalQuantity(e.target.value)}
                value={totalQuantity}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="xCor"
                onChange={(e) => setXCor(e.target.value)}
                value={xCor}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="yCor"
                onChange={(e) => setYCor(e.target.value)}
                value={yCor}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="Availabe Stocks"
                onChange={(e) => setAvailableStocks(e.target.value)}
                value={availableStocks}
              /></div>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="Selling Price"
                onChange={(e) => setSellingPrice(e.target.value)}
                value={sellingPrice}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="Rent Amount"
                onChange={(e) => setRentAmount(e.target.value)}
                value={rentAmount}
              />
            </div>
            <button
              className={`${styles.modalIssueBtn}`}
              onClick={handlePlotSellBtn}
            >
              Sell Plot
            </button>
          </div>
        </div>
      </Modal>
      <button onClick={refreshPage}>Refresh</button>
      <div className={styles.studentDashboardContainer}>
        <div className={styles.dashboardBox}>
          <div className={styles.heading}>
            Welcome <span className={styles.accountName}>{user.name}</span>
          </div>

          <div className={styles.detailsBox}>
            <span className={styles.detailsHeading}>My details</span>
            <div className={styles.detailsBoxContent}>
              <span className={styles.key}>Public Address: </span>
              <span className={styles.name}>{currentAccount}</span>
              <span className={styles.key}>Full Name: </span>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.key}>Aadhaar No: </span>
              <span className={styles.name}>{user.aadhaar}</span>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.detailsHeading}>
              <span>My Holdings</span>
              <div>
                <button
                  className={styles.buyNewHoldingsBtn}
                  onClick={handleNavigateToPlots}
                >
                  Buy Holdings
                </button>
              </div>
            </div>
            {holdings.length > 0 ? (
              <>
                <div className={styles.docCardHeader}>
                  <span className={styles.docCardContent}>Plot Name</span>
                  <span className={styles.docCardContent}>Owner Name</span>
                  <span className={styles.docCardContent}>% Share</span>
                  <span className={styles.docCardContent}>Rent</span>
                </div>
                {holdings.map((item, index) => {
                  return (
                    <div
                      className={
                        index % 2 == 0
                          ? `${styles.docCard} ${styles.evenDocCard}`
                          : `${styles.docCard} ${styles.oddDocCard}`
                      }
                      onClick={() => {
                        // openDocPage(item.file.cid, item.file.fileName);
                      }}
                    >
                      <span className={styles.docCardContent}>
                        {item.plotName}
                      </span>
                      <span className={styles.docCardContent}>
                        {item.owner}
                      </span>
                      <span className={styles.docCardContent}>
                        {item.percentShare} %
                      </span>
                      <span className={styles.docCardContent}>{item.rent}</span>
                    </div>
                  );
                })}
              </>
            ) : (
              <span className={styles.emptyListMessage}>No holdings found</span>
            )}
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.detailsHeading}>
              <span>My Sellings</span>
              <div>
                <button
                  className={styles.buyNewHoldingsBtn}
                  onClick={handleSellPlotModalOpen}
                >
                  Sell Plot
                </button>
              </div>
            </div>
            {sellings.length > 0 ? (
              <>
                <div className={styles.docCardHeader}>
                  <span className={styles.docCardContent}>Plot Name</span>
                  <span className={styles.docCardContent}>% Distributed</span>
                  <span className={styles.docCardContent}>
                    Num of Investors
                  </span>
                </div>
                {sellings.map((item, index) => {
                  return (
                    <div
                      className={
                        index % 2 == 0
                          ? `${styles.docCard} ${styles.evenDocCard}`
                          : `${styles.docCard} ${styles.oddDocCard}`
                      }
                      onClick={() => {
                        // openDocPage(item.file.cid, item.docName);
                      }}
                    >
                      <span className={styles.docCardContent}>
                        {item.plotName}
                      </span>
                      <span className={styles.docCardContent}>
                        {item.percentDistributed} %
                      </span>
                      <span className={styles.docCardContent}>
                        {item.numOfInvestors}
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <span className={styles.emptyListMessage}>No sellings found</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
