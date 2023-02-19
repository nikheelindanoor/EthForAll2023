import { useAuth } from "@arcana/auth-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSmartEstateContext } from "../../Context/SmartEstateContext";
import styles from "./Register.module.css";

const Register = () => {
	const { connectUsingArcana, currentAccount, registerUser } = useSmartEstateContext();
	const [pubAddr, setPubAddr] = useState("");
	const [aadharNo, setAadharNo] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	useEffect(() => {
		setPubAddr(currentAccount);
	}, [currentAccount]);

	const handleRegisterUser = async () => {
		try{
			await registerUser(name, mobileNo, aadharNo, email);
			console.log("registered!");
			for (let index = 0; index < 100000; index++) {
				
			}
			navigate('/dashboard')
		}catch(error){
			console.log(error);
		}
	}

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
							onChange={(e) => {setAadharNo(e.target.value); console.log(aadharNo)}}
							value={aadharNo}
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

					<button onClick={handleRegisterUser} className={styles.registerBtn}>
						Register
					</button>
				</div>
			</div>
		</>
	);
};

export default Register;
