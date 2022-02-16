import React, {Component} from 'react';
import './Crypto.css';

import CryptoList from './CryptoList';

import axios from 'axios';



class Crypto extends Component {

    constructor(props){
        super(props);

        this.state = {
            cryptoList: [],
            filteredCryptoList: [],
            /* trial: [1,2,3,4,5], */
        };
    }

    componentDidMount() {
        this.getCryptoData();
        this.timerID = setInterval(()=>this.getCryptoData(), 5000);
    }

    componentWillUnmount () {
        clearInterval(this.timerID);
    }

    getCryptoData() {
        axios.get('https://blockchain.info/ticker', {
            mode: 'cors'
        })
        
            .then(res => {
                
                const tickers = res.data;

                // console.log("tickers", tickers);
                

                this.setState((state) => {
                    let newCryptolist = [];

                    for (const [key, cryptoRate] of Object.entries(tickers)) {

                        /* console.log("cryptoList", this.state.cryptoList);
                        console.log("key", key);
                        console.log("cryptoRate", cryptoRate); */

                        let lastCryptoObj = state.cryptoList.find((newCryptoObj)=>{
                            return (newCryptoObj.currency === key);
                        });

                        console.log("lastCryptoObj", lastCryptoObj);

                        let newCryptoObj = {
                            currency: key,
                            symbol: cryptoRate.symbol,
                            buy: cryptoRate.buy,
                            sell: cryptoRate.sell,
                            lastRate: cryptoRate.last,
                            // pietansciem: cryptoRate.15m,
                        }

                        if (lastCryptoObj !== undefined) {

                            if (newCryptoObj.lastRate>lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'green';
                                newCryptoObj.htmlArray = String.fromCharCode(8593);
                            } else if (newCryptoObj.lastRate<lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'red';
                                newCryptoObj.htmlArray = String.fromCharCode(8595);  
                            } else {
                                newCryptoObj.cssClass = 'blue';
                                newCryptoObj.htmlArray = String.fromCharCode(8596);  
                            }


                        } else {

                            newCryptoObj.cssClass = 'blue';

                            newCryptoObj.htmlArray = String.fromCharCode(8596);

                        }

                        newCryptolist.push(newCryptoObj);
                    }

                    /* console.log(newCryptolist); */

                    return ({

                        cryptoList: newCryptolist

                    });

                });


                /* console.log("tickers", res.data);
                console.log("trial", this.state.trial);
                console.log("cryptolist", this.state.cryptoList); */

                this.filterMethod();

            });
    }

    filterMethod = () => {

        this._inputFilter.value = this._inputFilter.value.trim().toUpperCase()

        this.setState((state)=>{
            let newFilteredCryptoList = state.cryptoList.filter((cryptoObj)=> {
                return(cryptoObj.currency.includes(this._inputFilter.value));
            });
        

            return({

                filteredCryptoList: newFilteredCryptoList

            });

        });
        // console.log("FilteredCryptolist", this.state.filteredCryptoList);
    }


    render() {

        return(

            <div className="Crypto">
            
            <input type="text" placeholder='filter' ref={(element)=>{this._inputFilter=element}} onChange={this.filterMethod} />

            <CryptoList cryptoList={this.state.filteredCryptoList}/>
               
            </div>

        );

    }

}

export default Crypto;