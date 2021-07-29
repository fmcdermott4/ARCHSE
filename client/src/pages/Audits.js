import React from 'react';
import { useQuery } from '@apollo/client';
import AvailableAudits from '../components/AvailableAudits';
import { QUERY_CATEGORIES, QUERY_AUDIT_TYPES } from '../utils/queries';
import Auth from '../utils/auth';

const Audits = () => {
    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];
    const auditTypes = useQuery(QUERY_AUDIT_TYPES).data;
    const auditTypesButton = (auditTypes) =>{
        
        if(typeof(auditTypes) === 'undefined'){
            return("Loading...")
        } else{ 
            const button = () =>{
                auditTypes.auditTypes.map((audit) => {
                    console.log(audit.auditType)
                })
            }
            
            console.log(button())
        }
    };
    
    return(
        <main>
            <div>
                {(loading) ? (<div>Loading...</div>) : (<div></div>)}  
                {auditTypesButton(auditTypes)}          
                {Auth.loggedIn() ? (<AvailableAudits categories={categories} title="Available audits:" />) : (<p>Please <a href="/login">log in</a> to view this content.</p>)}
            </div>
        </main>
    )
};

export default Audits;