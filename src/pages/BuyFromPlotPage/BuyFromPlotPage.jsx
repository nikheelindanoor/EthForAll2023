import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styles from "./BuyFromPlotPage.module.css";

const BuyFromPlotPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyPercentQuantity, setBuyPercentQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleOpenBuyModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseBuyModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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

          <form className={styles.formBox}>
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
              // onClick={handleSubmit}
            >
              {isLoading ? "Loading..." : "Buy"}
            </button>
          </form>
        </div>
      </Modal>
        <div className={styles.dashboardBox}>
          <div className={styles.detailsBox}>
            <span className={styles.detailsHeading}>Property Details</span>
            <div className={styles.detailsBoxContent}>
              <span className={styles.key}>Plot ID: </span>
              <span className={styles.name}></span>
              <span className={styles.key}>Plot Name: </span>
              <span className={styles.name}></span>
              <span className={styles.key}>Owner Name: </span>
              <span className={styles.name}></span>
              <span className={styles.key}>Percentage Distributed: </span>
              <span className={styles.name}></span>
              <span className={styles.key}>No of holders: </span>
              <span className={styles.name}>{holders.length}</span>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.detailsHeading}>
              <span>Holders ready to sell</span>
            </div>
            {holders.length > 0 ? (
              <>
                <div className={styles.docCardHeader}>
                  <span className={styles.docCardContent}>Holder Name</span>
                  <span className={styles.docCardContent}>
                    Selling Percentage
                  </span>
                  <span className={styles.docCardContent}>Selling Price</span>
                </div>
                {holders.map((item, index) => {
                  return (
                    <div
                      className={
                        index % 2 == 0
                          ? `${styles.docCard} ${styles.evenDocCard}`
                          : `${styles.docCard} ${styles.oddDocCard}`
                      }
                      onClick={() => {
                        handleOpenBuyModal();
                      }}
                    >
                      <span className={styles.docCardContent}>
                        {item.holderName}
                      </span>
                      <span className={styles.docCardContent}>
                        {item.sellingPercent}%
                      </span>
                      <span className={styles.docCardContent}>
                        {item.sellingPrice}
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <span className={styles.emptyListMessage}>No holdings found</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyFromPlotPage;
