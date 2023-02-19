import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSmartEstateContext } from "../../Context/SmartEstateContext";
import styles from "./SellingsPage.module.css";

const SellingsPage = () => {
	const navigate = useNavigate();

	const {
		currentAccount,
		connectUsingArcana,
		fetchUserByAddress,
		fetchSellingsForSellingPage,
	} = useSmartEstateContext();
	const [user, setUser] = useState([]);

	const fetchUser = useCallback(async () => {
		try {
			const data = await fetchUserByAddress(currentAccount);
			setUser(data);
		} catch (err) {
			// navigate("/regiser");
		}
	});

	const fetchSellings = useCallback(async () => {
		try {
			const plotId = window.location.pathname.split("/")[2];
			console.log(plotId);
			const data = await fetchSellingsForSellingPage(plotId);
			setSellings(data.sellings);
			setHolders(data.holders);
		} catch (err) {
			console.log(err);
		}
	});

	useEffect(() => {
		if (currentAccount === "") {
			connectUsingArcana();
		} else {
			fetchUser();
			fetchSellings();
		}
	}, [currentAccount]);

	const [holders, setHolders] = useState([
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
	]);
	const [sellings, setSellings] = useState([
		{
			plotName: "ABCDEF",
			percentDistributed: 85.6,
			numOfInvestors: 8,
		},
	]);

	return (
		<>
			<div className={styles.studentDashboardContainer}>
				<div className={styles.dashboardBox}>
					<div className={styles.detailsBox}>
						<span className={styles.detailsHeading}>
							Property Details
						</span>
						<div className={styles.detailsBoxContent}>
							<span className={styles.key}>Plot ID: </span>
							<span className={styles.name}>{sellings.id}</span>
							<span className={styles.key}>Plot Name: </span>
							<span className={styles.name}>{sellings.name}</span>
							<span className={styles.key}>Seller Name: </span>
							<span className={styles.name}>
								{sellings.userName}
							</span>
							<span className={styles.key}>
								Percentage Distributed:{" "}
							</span>
							<span className={styles.name}>
								{sellings.availableStocks.toNumber() /
									sellings.totalQuantity.toNumber()}
							</span>
							<span className={styles.key}>No of holders: </span>
							<span className={styles.name}>
								{holders.length}
							</span>
						</div>
					</div>

					<div className={styles.detailsBox}>
						<div className={styles.detailsHeading}>
							<span>Holders</span>
						</div>
						{holders.length > 0 ? (
							<>
								<div className={styles.docCardHeader}>
									<span className={styles.docCardContent}>
										Holder Name
									</span>
									<span className={styles.docCardContent}>
										Percentage
									</span>
									<span className={styles.docCardContent}>
										Start Date
									</span>
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
											<span
												className={
													styles.docCardContent
												}
											>
												{item.holderName}
											</span>
											<span
												className={
													styles.docCardContent
												}
											>
												{item.percentShare}%
											</span>
											<span
												className={
													styles.docCardContent
												}
											>
												{item.startDate}
											</span>
										</div>
									);
								})}
							</>
						) : (
							<span className={styles.emptyListMessage}>
								No holdings found
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SellingsPage;
