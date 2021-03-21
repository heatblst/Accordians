import React, { useState } from "react";
import "./App.css";
import Loan from "./components/Loan";
function App() {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [term, setTerm] = useState(0);
  const [emi, setEmi] = useState("");
  const [totalprincipal, setTotalPrincipal] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [error, setError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [interestError, setInterestError] = useState("");
  const [termError, setTermError] = useState("");
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [termButtonClicked, setTermButtonClicked] = useState(false);
  const [monthColor, setMonthColor] = useState("");
  const [yearColor, setYearColor] = useState("");
  const re = /^[0-9]*$/;

  const handleAmount = (event) => {
    let val = event.target.value;
    setAmount(val);
    setAmountError(isVerify(val));
  };
  const handleInterest = (event) => {
    let val = event.target.value;
    setInterest(val);
    setInterestError(isVerify(val));
  };
  const handleTerm = (event) => {
    let val = event.target.value;
    setTerm(val);
    setTermError(isVerify(val));
  };

  const isVerify=(val)=>{
    let err = "";
    if(!val){
      err = "Please fill out this field.";
    }else if(!re.test(Number(val))){
      err = "please enter a valid number";
    }
    else{
        err= "";
    }
    return err;
  }

  const handleYear = () => {
    setMonth(false);
    setYear(true);
    setTermButtonClicked(true);
    setMonthColor("cornflowerblue");
    setYearColor("blue");
  };
  const handleMonths = () => {
    setMonth(true);
    setYear(false);
    setTermButtonClicked(true);
    setMonthColor("blue");
    setYearColor("cornflowerblue");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid()) {
      calculateLoan();
    }
  };


  const isValid = () => {
    if(!amount || !interest || !term){
      setError("Please fill out all the fields");
      return false;
    }
    if(month === false && year === false){
      setError("Please select a term button");
      return false;
    }
    return true;
  };

  const calculateLoan = () => {
    const loanAmount = Number(amount);
    const rate =  Number(interest) / 100 / 12;
    const timePeriod = year ? Number(term) * 12 : Number(term);
    const x = Math.pow(1 + rate, timePeriod);
    const monthly = (loanAmount * x * rate) / (x - 1);
    if (isFinite(monthly)) {
      const monthlyPayment = monthly.toFixed(3);
      const totalAmount = (monthly * timePeriod).toFixed(3);
      const totalInterest = (monthly * timePeriod - loanAmount).toFixed(3);

      setEmi(monthlyPayment);
      setTotalPrincipal(totalAmount);
      setTotalInterest(totalInterest);
    }
  };

  return (
    <div className="container">
      <h1>Loan Calculator</h1>
      <div className="form">
        <form >
            <div>
              <label>Loan Amount</label><br/>
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={handleAmount}
                min = "0"
              />
              <p className="error">{amountError}</p>
            </div>
            <div>
              <label>Interest Rate Per Year</label><br/>
              <input
                type="text"
                placeholder="Interest"
                value={interest}
                onChange={handleInterest}
                min = "0"
              />
              <p className="error">{interestError}</p>
            </div>
            <div>
              <label>Loan Term</label><br/>
              <input
                type="text"
                placeholder="Terms"
                value={term}
                onChange={handleTerm}
                min = "0"
              /><p className="error">{termError}</p>
              <span className="rate-button">
                <input
                  className="btn"
                  type="button"
                  value="Months"
                  name="Months"
                  onClick={handleMonths}
                  style={{backgroundColor: monthColor}}
                />
              </span>
              <span className="rate-button">
                <input
                  className="btn"
                  type="button"
                  value="Years"
                  name="Years"
                  onClick={handleYear}
                  style={{backgroundColor: yearColor}}
                />
              </span>
             { !termButtonClicked ? <p className="error">{error}</p> : termButtonClicked && (!amount || !interest || !term) ? <p className="error">{error}</p> : null }
            </div>
            <input type="submit" value="Calculate Loan" className="submit-btn" onClick={handleSubmit} />
        </form>
      </div>
      <Loan emi={emi} totalInterest={totalInterest} totalprincipal={totalprincipal}/>
      
    </div>
  );
}

export default App;
