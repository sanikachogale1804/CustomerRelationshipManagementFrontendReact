import React, { useEffect, useState } from 'react'
import { getLeads } from '../services/leadService';

function LeadList() {
  const [leads,setLeads]=useState([]);

  useEffect(()=>{
    getLeads()
    .then((res)=>{
      setLeads(res.data._embedded.leads);
    })
    .catch((err)=>console.log(err));
  })

  return (
    <div>
      <h2>All Leads</h2>
      {leads.length === 0 ? (
        <p>No leads Found</p>
      ): (
        <table border="1" style={{padding:"10px"}}>
            <thead>
                <th>Business</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>City</th>
            </thead>
            <tbody>
                {leads.map((lead,index)=>(
                    <tr key={index}>
                        <td>{lead.business}</td>
                        <td>{lead.firstName} {lead.lastName}</td>
                        <td>{lead.mobile}</td>
                        <td>{lead.email}</td>
                        <td>{lead.city}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
    </div>
  );
}

export default LeadList
