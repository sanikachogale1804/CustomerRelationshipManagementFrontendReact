import React from 'react'

function LeadFom() {
  return (
    <div>
      Lead Form
      <form className='Lead-Form'>
        <h3>Enter Lead</h3>
        <label>
            Business
            <input name='firstName' /><br />
        </label>
        <label>
            Address
            <input name='address' /><br />
        </label>
        <label>
            First Name
            <input name='firstName' /><br />
        </label>
        <label>
            Last Name
            <input name='lastName' /><br />
        </label>
        <label>
            Designation
            <input name='designation' /><br />
        </label>
        <label>
            Country
            <input name='country' /><br />
        </label>
        <label>
            Mobile
            <input name="mobile" /><br />
        </label>
        <label>
            City
            <input name="city" /><br />
        </label>
        <label>
            State
            <input name="state" /><br />
        </label>
        <label>
            Email
            <input name='email'/><br/>
        </label>
        <label>
            GSTIN
            <input name='gstin'/><br/>
        </label>
        <label>
            Pincode
            <input name='pincode'/><br/>
        </label>
        <label>
            Website
            <input name='website'/><br/>
        </label>
        <label>
            Code
            <input name='code'/><br/>
        </label>
        
        <button>Create Lead</button>
      </form>
    </div>
  )
}

export default LeadFom
