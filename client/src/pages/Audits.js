import React from 'react';
import { useQuery } from '@apollo/client';
import AvailableAudits from '../components/AvailableAudits';
import { QUERY_CATEGORIES } from '../utils/queries';
import Auth from '../utils/auth';

const Audits = () => {
    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];
    
    return(
        <main>
            <div>
                {(loading) ? (<div>Loading...</div>) : (<div></div>)}            
                {Auth.loggedIn() ? (<AvailableAudits categories={categories} title="Here are the available audits:" />) : (<p>Please <a href="/login">log in</a> to view this content.</p>)}
            </div>
        </main>
    )
};

export default Audits;