import React from "react";
import styles from './HomePage.module.css';
import bg from "../../images/bg.png";
import { useNavigate } from "react-router-dom";
import one from "../../images/one.png";
import two from "../../images/two.png";
import three from "../../images/three.png";

const HomePage = () => {

    const navigate = useNavigate();
    const navigateToRegisterPage = () => {
        navigate("/register");
    };

    return (
        <div className={styles.homePageContainer}>
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className={styles.heroSection}
          >
            <div className={styles.logoSection}>
              {/* <img className={styles.logoImg} src={logo} alt="" /> */}
              DePlots
            </div>
            <div className={styles.descSection}>
              <span>Making Real Estate investment feasible<br/> for everyone using Blockchain</span>
              <button onClick={navigateToRegisterPage} className={styles.registerBtn}>
                Register
                {/* <ArrowForwardIcon className={styles.arrowForwardIcon} /> */}
              </button>
            </div>
          </div>
          <span className={styles.sectionHeader}>Special Features</span>
          <div className={styles.infoContainer}>
            <div className={styles.infoCard}>
              <img className={styles.infoImage} src={one} alt="" />
              <span>Secured by Blockchain</span>
            </div>
            <div className={styles.infoCard}>
              <img className={styles.infoImage} src={two} alt="" />
              <span>Fast onboarding using Arcana Auth</span>
            </div>
            <div className={styles.infoCard}>
              <img className={styles.infoImage} src={three} alt="" />
              <span>Easy Rent pay using Superfuild</span>
            </div>
          </div>
        </div>
      );
}

export default HomePage;