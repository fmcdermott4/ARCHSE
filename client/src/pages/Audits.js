import React from 'react';
import { useQuery } from '@apollo/client';
import AvailableAudits from '../components/AvailableAudits';
import { QUERY_CATEGORIES } from '../utils/queries';

const Audits = () => {
    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];
    
    return(
        <main>
            <div>            
                {loading ? (<div>Loading...</div>) : (<AvailableAudits categories={categories} title="Here are the available audits:" />)}
            </div>
        </main>
    )
};

export default Audits;