import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENCIES } from "../../graphql/querys";
import { Spinner } from "../../components";
import ErrorBoundry from "../../components/ErrorBoundry";
import styles from "./DropCurrMenu.module.css";

export const DropCurrMenu = ({ handleDropMenu, handleLabelValue }) => {
  return (
    <div className={styles.select} data-state="">
      <div
        className={styles.select__title}
        onClick={(e) => handleDropMenu(e)}
        data-default="$"
      >
        $
      </div>
      <div className={styles.select__content}>
        <input  id={"singleSelect0"} className={styles.select__input}/>
        <label  forhtml={"singleSelect0"}
                className={styles.select__label} />
        <Query query={GET_CURRENCIES}>
          {({ loading, data, error }) => {
            if (loading) return <Spinner/>;
            if (error) return <ErrorBoundry/>;
            return data?.currencies.map((curr, index) => {
              return (
                <React.Fragment key={curr.label}>
                  <input
                    id={"singleSelect" + (index + 1)}
                    className={styles.select__input}
                    type="radio"
                    value={curr.symbol}
                    name="singleSelect"
                  />
                  <label
                    onClick={(e) => handleLabelValue(e)}
                    forhtml={"singleSelect" + (index + 1)}
                    className={styles.select__label}
                  >
                    {curr.symbol} {curr.label}
                  </label>
                </React.Fragment>
              );
            });
          }}
        </Query>
      </div>
    </div>
  );
};
