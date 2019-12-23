import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { requestForProducts } from '../../store/ducks/bitcoin';

import './App.css';

const App = ({ requestProducts, bitcoin }) => {

  const [usdInfo, setUsdInfo] = useState(null);
  const [gbpInfo, setGbpInfo] = useState(null);
  const [eurInfo, setEurInfo] = useState(null);
  useEffect(()=> {
    requestProducts();
   },[])

    useEffect(() => {
    if (bitcoin.bpi) {
      let USDArray = [];
      let GBPArray = [];
      let EURArray = [];

      for (let [key,value] of Object.entries(bitcoin.bpi.USD)) {
        USDArray.push({
          key,
          value
        }) 
      }
      
      for (let [key,value] of Object.entries(bitcoin.bpi.GBP)) {
        GBPArray.push({
          key,
          value
        }) 
      }
      for (let [key,value] of Object.entries(bitcoin.bpi.EUR)) {
        EURArray.push({
          key,
          value
        }) 
      }
      
      setEurInfo(EURArray);
      setUsdInfo(USDArray);
      setGbpInfo(GBPArray);

    }
   }, [bitcoin.bpi])

  return (
    <div>
      <ul>
        {usdInfo && usdInfo.map(({key,value}) => <div key={key}>{value}</div>)}
        {gbpInfo && gbpInfo.map(({key,value}) => <div key={key}>{value}</div>)}
        {eurInfo && eurInfo.map(({key,value}) => <div key={key}>{value}</div>)}
      </ul>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  requestProducts: (() => dispatch(requestForProducts()))
});
const mapState = state => ({
  bitcoin: state.listBitcoin.bitcoinData,
});

export default connect(
  mapState,
  mapDispatchToProps,
)(App);
