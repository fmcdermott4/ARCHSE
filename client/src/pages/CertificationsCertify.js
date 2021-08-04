import React from 'react';
import {QUERY_PROFILES, QUERY_CERTIFICATIONS} from '../utils/queries';
import {useQuery} from '@apollo/client'
import Table from 'react-bootstrap/Table';



const CertificationsCertify = () => {

    const{loading, data} = useQuery(QUERY_PROFILES);

    const reportsTable = (profiles) => {
        
        return(
            <div>
                {profiles.map((profile)=>{
                    return<UserCertificationTable data={profile}/>
                })}
            </div>)
        }
    


    if(loading){
        return(<p>loading...</p>)
    }
    return(
        <div>
            {/* <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>table heading</th>
                        <th>table heading</th>
                        <th>table heading</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#</td>
                        <td>table body</td>
                        <td>table body</td>
                        <td>table body</td>                        
                    </tr>
                </tbody>

            </Table> */}

            {reportsTable(data.profiles)}
        </div>
    )
        
    
};

const UserCertificationTable = (profile) =>{
    const{loading, data} = useQuery(QUERY_CERTIFICATIONS);
    
        // console.log(profile.data.name)
        if(loading){
            return<div>loading...</div>
        }
        return<div>{console.log(data)}User</div>
};

export default CertificationsCertify;