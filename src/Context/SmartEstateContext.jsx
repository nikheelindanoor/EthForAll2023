import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Wenb3Model from "web3modal";
import { SmartEstateABI, SmartEstateAddress } from "./constants";
import { Web3Storage } from "web3.storage";
import { useAuth } from "@arcana/auth-react";

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(SmartEstateAddress, SmartEstateABI, signerOrProvider);

export const SmartEstateContext = React.createContext();

export const useSmartEstateContext = () => useContext(SmartEstateContext);

export const SmartEstateProvider = ({ children }) => {
	const web3AccessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFjNjkxYTc1NTFBODU3MzIzMTE2MWZEMzUyMUFEQ0MyNWFEQzIyOWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzM2MjY2MzYyMzQsIm5hbWUiOiJWSlRJSGFjayJ9.uy6sLbmvqoxFA6103tzsK-Ga0H_x_M9z_iYDoK4sPp0";
	const web3Storage = new Web3Storage({ token: web3AccessToken });
	// const { currentAccount } = useAuth();

	const connectingWithSmartContract = async () => {
		try {
			const web3Modal = new Wenb3Model();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchContract(signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const [currentAccount, setCurrentAccount] = useState("");
	const auth = useAuth();

	const connectUsingArcana = async () => {
		console.log("connecting...");
		try {
			const provider = await auth.connect();
			console.log(provider);
			console.log({ provider });
			setCurrentAccount(auth.user.address);
		} catch (error) {
			console.log({ error });
		}
	};

	const fetchAllUsers = async () => {
		const contract = await connectingWithSmartContract();
		const data = await contract.fetchAllUsers();
		console.log(data);
	};

	return (
		<SmartEstateContext.Provider
			value={{ connectUsingArcana, currentAccount }}
		>
			{children}
		</SmartEstateContext.Provider>
	);
};
