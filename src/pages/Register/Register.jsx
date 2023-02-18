import { useAuth } from "@arcana/auth-react";
import React, { useCallback, useEffect, useState } from "react";
import { useSmartEstateContext } from "../../Context/SmartEstateContext";
import styles from "./Register.module.css";

const Register = () => {
	const { connectUsingArcana } = useSmartEstateContext();
	const [pubAddr, setPubAddr] = useState("");
	const [sid, setSid] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
			<div className={styles.registerPageContainer}>
				<div className={`${styles.formBox}`}>
					<h2 className={`${styles.heading}`}>Register</h2>

					<button
						className={styles.connectWalletBtn}
						onClick={connectUsingArcana}
					>
						Connect Wallet
					</button>

					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Public Address
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							placeholder="Enter public address"
							onChange={(e) => setPubAddr(e.target.value)}
							value={pubAddr}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Full Name
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							placeholder="Enter your name"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>

					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Aadhar Number
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							placeholder="Enter your VJTI Registration ID"
							onChange={(e) => setSid(e.target.value)}
							value={sid}
						/>
					</div>

					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Mobile Number
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							placeholder="Enter your mobile number"
							onChange={(e) => setMobileNo(e.target.value)}
							value={mobileNo}
						/>
					</div>

					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Email ID
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							placeholder="Enter your VJTI Email ID"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>

					<button onClick={() => {}} className={styles.registerBtn}>
						Register
					</button>
				</div>
			</div>
		</>
	);
};

export default Register;
