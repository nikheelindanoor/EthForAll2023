import React, { useEffect } from "react";
import styles from './Navbar.module.css';
import { useNavigate } from "react-router-dom";
import Avatar, { genConfig } from 'react-nice-avatar';
import { useSmartEstateContext } from "../../Context/SmartEstateContext";

const Navbar = () => {

    const navigate = useNavigate();
	const {
		currentAccount,
		connectUsingArcana,
		fetchUserByAddress,
		fetchAllStocksForUser,
		fetchMySellings,
	} = useSmartEstateContext();

    const navigateToHome = () => {
        navigate("/");
    }

    const config = genConfig(currentAccount);
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div onClick={navigateToHome} className={styles.logoContainer}>
                    DePlots
                    {/* <img className={styles.logoImg} src={logo} alt="" /> */}
                </div>
                <div>
                    <Avatar className={styles.avatar} {...config} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;