import { useAppDispatch, useAppSelector } from "../src/hooks"
import { useEffect, useState } from "react";
import { fetchStocks, stockSelector } from "./slices/stock";
import { fetchStocksPrices, stockPriceSelector } from "./slices/prices";

import './App.css'

function App() {
  const stock = localStorage.getItem("stock");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const selectedStocks = useAppSelector(stockSelector);
  const selectedStocksPrices = useAppSelector(stockPriceSelector)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStocksPrices(" "));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch])

  useEffect(() => {
    setLoading(selectedStocks.loading);
    setError(selectedStocks.error);
    localStorage.setItem("stocks", JSON.stringify(selectedStocks.stocks?.stocks))
  }, [selectedStocks]);

  function handleFetchStock(stock: any) {
    localStorage.setItem("stock", stock)
    dispatch(fetchStocksPrices(stock));
    localStorage.setItem("stockprices", JSON.stringify(selectedStocksPrices.stocksprices))
  }
  const stocks = selectedStocks.stocks || [];
  const stockPrices = selectedStocksPrices.stocksprices || []
  return (
    <>
      <div className='container'>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <h1>FomoFactory!</h1>
        <select className="select" id="cars" onChange={(e) => handleFetchStock(e.target.value)}>
          <option value="">Select a stock</option>
          {stocks.map((stock) => (
            <option key={stock} value={stock}>
              {stock}
            </option>
          ))}
        </select>
          <div className="card">
            <h2>{stock}</h2>
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Rate</th>
                  <th>Volume</th>
                  <th>Cap</th>
                  <th>Delta</th>
                </tr>
              </thead>
              <tbody>
                {stockPrices.map((s, index) => (
                  <tr key={index}>
                    <td>{s.code}</td>
                    <td>{s.rate.toFixed(2)}</td>
                    <td>{s.volume}</td>
                    <td>{s.cap}</td>
                    <td>
                    <ul>
                      {Object.keys(s.delta).map((key) => (
                        <li key={key}>
                          {key}: {s.delta[key]}
                        </li>
                      ))}
                    </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </>

  )
}

export default App
