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
    const tHead =(<thead>
        <tr>
            <th>{profile.data.name}</th>
            <th>Class</th>
            <th>Certification</th>
            <th>Required</th>
            <th>Expiration Date</th>
            <th>Certified By</th>
            <th>Recertify</th>
        </tr>
    </thead>)
        console.log(profile.data.name)
        if(loading){
            return<div>loading...</div>
        }
        return<div><Table responsive="md">{tHead}</Table>{console.log(data)}</div>
};

export default CertificationsCertify;