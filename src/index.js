import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import { SmartEstateProvider } from "./Context/SmartEstateContext";

const provider = new AuthProvider("978bf98b19a6d13d221128e21280766c7ac70ca0", {
	chainConfig: {
		chainId: "0x13881",
		rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/VU5Z6_VJgdMUgrcfhGsHk2o5tzEfFbhT",
		// rpcUrl: "https://rpc.testnet.mantle.xyz/",
	},
}); // required
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ProvideAuth provider={provider}>
			<SmartEstateProvider>
				<App />
			</SmartEstateProvider>
		</ProvideAuth>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
