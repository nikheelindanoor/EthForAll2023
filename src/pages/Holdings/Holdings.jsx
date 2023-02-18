import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Holdings.module.css";

const Holdings = () => {
  const navigate = useNavigate();

  const [sellingQuantity, setSellingQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const holders = [
    {
      holderName: "ABCDE",
      percentShare: 20,
      startDate: "15/10/2019",
    },
    {
      holderName: "ABCDE",
      percentShare: 20,
      startDate: "15/10/2019",
    },
  ];
  const sellings = [
    {
      plotName: "ABCDEF",
      percentDistributed: 85.6,
      numOfInvestors: 8,
    },
  ];

  return (
    <>
      <div className={styles.studentDashboardContainer}>
        <div className={styles.dashboardBox}>
          <div className={styles.detailsBox}>
            <span className={styles.detailsHeading}>Holding Details</span>
            <div className={styles.detailsBoxContent}>
              <span className={styles.key}>Plot ID: </span>
              <span className={styles.name}>123456789</span>
              <span className={styles.key}>Plot Name: </span>
              <span className={styles.name}>ABCDE</span>
              <span className={styles.key}>Seller Name: </span>
              <span className={styles.name}>Ravi Maurya</span>
              <span className={styles.key}>Percentage Holded: </span>
              <span className={styles.name}>20%</span>
              <span className={styles.key}>Buying Price: </span>
              <span className={styles.name}>20%</span>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.detailsHeading}>
              <span>Sell</span>
            </div>
            <div className={`${styles.formBox}`}>

              <div className={`${styles.inputContainer}`}>
                <label className={`${styles.inputLabel}`}>Quantity in Percent</label>
                <input
                  className={`${styles.input}`}
                  type="text"
                  placeholder="Enter public address"
                  onChange={(e) => setSellingQuantity(e.target.value)}
                  value={sellingQuantity}
                />
              </div>
              <div className={`${styles.inputContainer}`}>
                <label className={`${styles.inputLabel}`}>Full Name</label>
                <input
                  className={`${styles.input}`}
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => setSellingPrice(e.target.value)}
                  value={sellingPrice}
                />
              </div>
              <button onClick={() => {}} className={styles.sellBtn}>
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Holdings;
