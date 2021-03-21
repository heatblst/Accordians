import React from 'react';
import "./Loan.css";
const Loan = (props) => {
    return (
        <div className="loan-data">
            <div className="display-data">
                <div>
                <label>Your Monthly Payment</label><br/>
                  <h3>{props.emi}</h3>
                </div>
                <div>
                <label>Total Principal Paid</label><br/> 
                <h3>{props.totalprincipal}</h3>
                </div>
                <div>
                <label>Total Interest Paid</label><br/>
                <h3>{props.totalInterest}</h3>
                </div>
            </div>
        </div>
    );
};

export default Loan;