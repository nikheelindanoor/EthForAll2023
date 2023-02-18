import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SellingsPage.module.css";

const SellingsPage = () => {
  const navigate = useNavigate();

  const holders = [
    {
      holderName: "ABCDE",
      percentShare: 20,
      startDate: "15/10/2019"
    },
    {
      holderName: "ABCDE",
      percentShare: 20,
      startDate: "15/10/2019"
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
            <span className={styles.detailsHeading}>Property Details</span>
            <div className={styles.detailsBoxContent}>
              <span className={styles.key}>Plot ID: </span>
              <span className={styles.name}>123456789</span>
              <span className={styles.key}>Plot Name: </span>
              <span className={styles.name}>ABCDE</span>
              <span className={styles.key}>Seller Name: </span>
              <span className={styles.name}>Ravi Maurya</span>
              <span className={styles.key}>Percentage Distributed: </span>
              <span className={styles.name}>80%</span>
              <span className={styles.key}>No of holders: </span>
              <span className={styles.name}>9</span>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.detailsHeading}>
              <span>Holders</span>
            </div>
            {holders.length > 0 ? (
              <>
                <div className={styles.docCardHeader}>
                  <span className={styles.docCardContent}>Holder Name</span>
                  <span className={styles.docCardContent}>Percentage</span>
                  <span className={styles.docCardContent}>Start Date</span>
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
                        // openDocPage(item.file.cid, item.file.fileName);
                      }}
                    >
                      <span className={styles.docCardContent}>
                        {item.holderName}
                      </span>
                      <span className={styles.docCardContent}>
                        {item.percentShare}%
                      </span>
                      <span className={styles.docCardContent}>{item.startDate}</span>
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

export default SellingsPage;
