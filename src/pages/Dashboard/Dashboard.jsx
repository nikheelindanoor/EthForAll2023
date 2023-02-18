import React from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const holdings = [
    {
      plotName: "ABCDE",
      owner: "Atharva Patil",
      percentShare: 3.5,
      rent: "60,000",
    },
  ];
  const sellings = [
    {
      plotName: "ABCDEF",
      percentDistributed: 85.6,
      numOfInvestors: 8,
    },
  ];

  const handleNavigateToPlots = () => {
    navigate("/plots");
  };

  return (
    <>
      <div className={styles.studentDashboardContainer}>
        <div className={styles.dashboardBox}>
          <div className={styles.heading}>
            Welcome <span className={styles.accountName}>Ravi Maurya</span>
          </div>

          <div className={styles.detailsBox}>
            <span className={styles.detailsHeading}>My details</span>
            <div className={styles.detailsBoxContent}>
              <span className={styles.key}>Public Address: </span>
              <span className={styles.name}>0x123456789</span>
              <span className={styles.key}>Full Name: </span>
              <span className={styles.name}>Ravi Maurya</span>
              <span className={styles.key}>Email ID: </span>
              <span className={styles.name}>ravimaurya027@gmail.com</span>
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
            <span className={styles.detailsHeading}>My Sellings</span>
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
