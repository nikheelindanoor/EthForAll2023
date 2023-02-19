import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import styles from "./RentDashboard.module.css";
import { useSmartEstateContext } from "../../Context/SmartEstateContext";

const RentDashboard = () => {
  
  const id = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyPercentQuantity, setBuyPercentQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plotName, setPlotName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [percentageDistributed, setBuyPercentageDistributed] = useState();
  const [holderData, setHolderData] = useState([]);

  const {
    fetchPlotById,
    fetchAllStocksForPlot,
    buyStocks,
  } = useSmartEstateContext();

  const fetchPlotDetails = async() => {
    console.log(id.pid);
    const plotdata = await fetchPlotById(id.pid);
    const _holderData = await fetchAllStocksForPlot(id.pid);
    setHolderData(_holderData);
    console.log("=========================")
    console.log(holderData);
    // console.log(plotdata);
    setPlotName(plotdata.name);
    setOwnerName(plotdata.creatorId.toString());
    setBuyPercentageDistributed(parseInt(plotdata.availableStocks.toString()) - parseInt(plotdata.totalQuantity.toString()));
    console.log(plotName);
    console.log(ownerName);
  }

  const [holders, setHolders] = useState([
    {
      holderName: "ABCDE",
      sellingPercent: 20,
      sellingPrice: "1500",
    },
    {
      holderName: "ABCDE",
      sellingPercent: 20,
      sellingPrice: "1489",
    },
  ]);
  const [sellings, setSellings] = useState(
    {
      plotName: "ABCDEF",
      percentDistributed: 85.6,
      numOfInvestors: 8,
    });

  const buyFromSeller = async () => {
    // add code to buy a particular share percent from that seller
  };

  const [selectedIndex, setSelectedIndex] = useState();
  const handleOpenBuyModal = (index) => {
    setIsModalOpen(true);
    setSelectedIndex(index);
  };

  const handleCloseBuyModal = () => {
    setIsModalOpen(false);
  };
//stockId, target, quantityToBuy, price, plotId, sellQuantity
  const handleBuyStocks = async() => {
    const data = await buyStocks(parseInt(holderData[selectedIndex].stockId.toString()), holderData[selectedIndex].holderAddress, buyPercentQuantity, parseInt(holderData[selectedIndex].price.toString()), parseInt(holderData[selectedIndex].plotId.toString()), 0);
    console.log(data);
  }

  const handlePayRent = async () => {
    const data = await buyStocks(0, "0x5015Ae5Af2e03d349f18F114085f05835Fe40e64", 0, 0, 0, 0);
    console.log(data);
  }

  return (
    <>
      <button style={{alignSelf: "end"}} onClick={fetchPlotDetails}>.</button>
      <div className={styles.studentDashboardContainer}>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseBuyModal}
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
          <button className={styles.closeButton} onClick={handleCloseBuyModal}>
            {/* <CloseIcon /> */}x
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

          <div className={styles.formBox}>
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="Percentage to buy"
                onChange={(e) => setBuyPercentQuantity(e.target.value)}
                value={buyPercentQuantity}
              />
            </div>

            <button
              className={`${styles.modalIssueBtn}`}
              onClick={handleBuyStocks}
            >
              {isLoading ? "Loading..." : "Buy"}
            </button>
          </div>
        </div>
      </Modal>
        <div className={styles.dashboardBox}>
          <div className={styles.detailsBox}>
            <span className={styles.detailsHeading}>Property Details</span>
            <div className={styles.detailsBoxContent}>
              <span className={styles.key}>Plot ID: </span>
              <span className={styles.name}>{id.pid}</span>
              <span className={styles.key}>Plot Name: </span>
              <span className={styles.name}>{plotName}</span>
              <span className={styles.key}>Owner Id: </span>
              <span className={styles.name}>{ownerName}</span>
              <span className={styles.key}>Percentage Distributed: </span>
              <span className={styles.name}>{percentageDistributed * -1}%</span>
              <span className={styles.key}>No of holders: </span>
              <span className={styles.name}>{holders.length}</span>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.detailsHeading}>
              <span>Pay Rent</span>
            </div>
            <div className={`${styles.formBox}`}>

              <div className={`${styles.inputContainer}`}>
                <label className={`${styles.inputLabel}`}>Rent to pay: </label>
                <span>15000/-</span>
              </div>
              <button onClick={handlePayRent} className={styles.payRentBtn}>
                Pay Rent
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentDashboard;
