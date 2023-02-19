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
			const arcanaProvider = await auth.connect();
			const provider = new ethers.providers.Web3Provider(arcanaProvider);
			console.log(provider);
			const signer = provider.getSigner();
			const contract = fetchContract(signer);
			console.log(contract);
			return contract;
		} catch (error) {
			// console.log("Something went wrong while connecting with contract!");
			console.log(error);
		}
	};

	const [currentAccount, setCurrentAccount] = useState("");
	const auth = useAuth();

	const connectUsingArcana = async () => {
		console.log("connecting...");
		try {
			const arcanaProvider = await auth.connect();
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		if(auth.user){
			console.log(auth);
			setCurrentAccount(auth.user.address);
		}
	}, [auth]);

	const registerUser = async (userName, mobileNo, aadharNo, aadharCID) => {
		const contract = await connectingWithSmartContract();
		if(currentAccount){
			const data = await contract.registerUser(currentAccount, userName, mobileNo, aadharNo, aadharCID);
			console.log(data);
		}
	}

	const fetchAllUsers = async () => {
		const contract = await connectingWithSmartContract();
		const data = await contract.fetchAllUsers();
		console.log(data);
		return data;
	};

	const fetchAllPlots = async() => {
		const contract = await connectingWithSmartContract();
		const data = await contract.fetchAllPlots();
		console.log("-=-=-=-=-=-=-=-=-")
		data.length !== 0 && data.map((request, id) => {
			console.log(request.id.toString());
		})
		// console.log(data);
		return data;
	}

	const fetchPlotById = async(id) => {
		const contract = await connectingWithSmartContract();
		const plotdata = contract.fetchPlotById(id);
		console.log(plotdata);
		return plotdata;
	}


	const fetchAllStocksForUser = async (address, ownerName) => {
		const contract = await connectingWithSmartContract();
		const data = await contract.fetchAllStocksForUser(address);
		const user = await contract.fetchUserByAddress();
		var res = [];
		for (let i = 0; i < data.length; i++) {
			const plot = await contract.fetchPlotById(data[i].plotId);
			res.push({
				plotName: data[i].name,
				owner: ownerName,
				percentShare:
					data[i].quantity.toNumber() /
					plot[i].totalQuantity.toNumber(),
				rent: plot[i].rentAmount.toNumber(),
			});
		}
		console.log(data);
		return data;
	};

	const fetchUserByAddress = async (address) => {
		const contract = await connectingWithSmartContract();
		const data = await contract.fetchUserByAddress(address);
		console.log(data);
		return data;
	};

	const fetchMySellings = async (address) => {
		const contract = await connectingWithSmartContract();
		const plots = await contract.fetchUserPlots(address);

		var res = [];

		for (let i = 0; i < plots.length; i++) {
			const data = await contract.fetchAllStocksForPlot(plots[i].id);
			res.push({
				plotName: plots[i].name,
				percentDistributed:
					plots[i].availableStocks.toNumber() /
					plots[i].totalQuantity.toNumber() * 100,
				numOfInvestors: data.length,
			});
		}

		return res;
	};

	const fetchSellingsForSellingPage = async (plotId) => {
		const contract = await connectingWithSmartContract();
		const plot = await contract.fetchPlotById(plotId);
		const plotUser = await contract.fetchUserById(plot.creatorId);

		var res = [];

		const data = await contract.fetchAllStocksForPlot(plot.id);
		for (let i = 0; i < data.length; i++) {
			const user = await contract.fetchUserById(data[i].userId);
			res.push({
				holderName: user.name,
				percentShare:
					data[i].quantity.toNumber() / plot.totalQuantity.toNumber(),
				startDate: "15/10/2019",
			});
		}

		return {
			sellings: { ...plot, userName: plotUser.name },

			holders: res,
		};
	};


	const buyStocks = async(stockId, target, quantityToBuy, price, plotId, sellQuantity) => {
		const contract = await connectingWithSmartContract();
		const data = await contract.buyStocks(stockId, target, quantityToBuy, price, plotId,sellQuantity);
		console.log(data);
	}



	const sellPlot = async(name, realAdd, xCor, yCor, totalQuantity, availableStocks, price, rentAmount) => {
		const contract = await connectingWithSmartContract();
		const data = await contract.addPlot(name, realAdd, xCor, yCor, totalQuantity, availableStocks, price, rentAmount);
		console.log("=========================================selling plot===================================================")
		console.log(data);
	}

	const fetchAllStocksForPlot = async(plotId) => {
		const contract = await connectingWithSmartContract();
		const data = contract.fetchAllStocksForPlot(plotId);
		// console.log(data)
		return data;
	}

	const fetchStocksPerUser = async(userAdd) => {
		const contract = await connectingWithSmartContract();
		const data = await contract.fetchAllStocksForUser(userAdd);
		return data;
	}

	return (
		<SmartEstateContext.Provider
			value={{
				connectUsingArcana,
				currentAccount,
				registerUser,
				fetchAllStocksForUser,
				fetchAllUsers,
				fetchUserByAddress,
				fetchMySellings,
				fetchSellingsForSellingPage,
				buyStocks,
				sellPlot,
				fetchAllPlots,
				fetchPlotById,
				fetchAllStocksForPlot,
				fetchStocksPerUser,
			}}
		>
			{children}
		</SmartEstateContext.Provider>
	);
};
