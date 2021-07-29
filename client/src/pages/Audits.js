import React from 'react';
import { useQuery } from '@apollo/client';
import AvailableAudits from '../components/AvailableAudits';
import { QUERY_AUDIT_TYPES, QUERY_CATEGORY_BY_AUDIT_TYPE } from '../utils/queries';
import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form'

const { useState } = React;

const Audits = () => {

  
    const {loading, data} = useQuery(QUERY_AUDIT_TYPES);
    const [selected, setSelected] = useState("OSHA");

    const handleChange = (event) => {
        setSelected(event.target.value);          
    };
    const auditTypesButton = (auditTypes) =>{
        
        if(typeof(auditTypes) === 'undefined'){
            return("Loading...")
        } else{ 
            const button = (auditTypes) =>{
                return(
                    auditTypes.auditTypes.map((audit) => {
                        return(<option key={audit.auditType} value={audit.auditType}>{audit.auditType}</option>)
                    })
                )
            }
            return(<Form><Form.Label>Select Audit Type</Form.Label><Form.Control as="select" defaultValue="OSHA" onChange={handleChange}>{button(auditTypes)}</Form.Control></Form>)
        }
    };


        
    return(
        <main>
            <div>
                {(loading) ? (<div>Loading...</div>) : (auditTypesButton(data))}  
                
                <AuditSelected category={selected}/>        
                
            </div>
        </main>
    )
};


const AuditSelected = (selected) => {
    const { loading, data } = useQuery(
        QUERY_CATEGORY_BY_AUDIT_TYPE,
            {
                variables: {auditType: selected.category}
            }
        );
    
    const categories = data?.categoryByAuditType || [];
    
    return(
        <div>
            {(loading) ? (<div>Loading...</div>) : (<div></div>)} 

            {Auth.loggedIn() ? (<AvailableAudits categories={categories} title="Available audits:" />) : (<p>Please <a href="/login">log in</a> to view this content.</p>)}
        </div>
    )
}
export default Audits;