import React from 'react';
import './CryptoList.css';

function CryptoList(props){

    let cryptoListlocal = props.cryptoList;
    console.log("local", cryptoListlocal);
    let liElements = cryptoListlocal.map((cryptoListlocalEl) =>  { 
        
        return (

            <li key={cryptoListlocalEl.currency} >
                <span className="cryptoLabel"> Last rate: </span>
                <span className={`cryptorate ${cryptoListlocalEl.cssClass}`}> {cryptoListlocalEl.lastRate} {cryptoListlocalEl.htmlArray} </span>
                <span className="Ticker"> {cryptoListlocalEl.currency} </span>
                <span className="CurrencySymbol"> [{cryptoListlocalEl.symbol}] </span>
            </li>
        );
    }) 

    return (

        <div className="CryptoList">

            <ul className="TheList">
                
                {liElements};

            </ul>

        </div>

    );

}
export default CryptoList;