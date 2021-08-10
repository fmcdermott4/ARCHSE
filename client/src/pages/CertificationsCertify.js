import React from 'react';
import {QUERY_SINGLE_PROFILE, QUERY_CERTIFICATIONS, QUERY_REPORTING_STRUCTURE} from '../utils/queries';
import {useQuery} from '@apollo/client'
import Table from 'react-bootstrap/Table';
import Auth from '../utils/auth';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const CertificationsCertify = () => {
    const{loading, data} = useQuery(QUERY_CERTIFICATIONS);
    const certUniqueSort = (input)=> {

        let data = Object.assign([],input);
        for(let i = 0; i<data.length; i++){            
            for(let z = i; z < data.length ; z++){   
                // console.log(data[z].name.toUpperCase() + " " + current.name.toUpperCase())                             
                if(data[z].name.toUpperCase() < data[i].name.toUpperCase()){                    
                    data.splice(i,0,data[z]);
                    data.splice(z+1,1)                    
                }               
            }
        }
        for(let i = 0; i<data.length; i++){            
            for(let z = i; z < data.length ; z++){   
                // console.log(data[z].name.toUpperCase() + " " + current.name.toUpperCase())                             
                if(data[z].certificationClass.toUpperCase() < data[i].certificationClass.toUpperCase()){                    
                    data.splice(i,0,data[z]);
                    data.splice(z+1,1)                    
                }               
            }
        }
       return(data) 
    }


    if(loading){
        return(<p>loading...</p>)
    }
    return(
        <div>
            {/* {console.log(data.certifications)} */}
            {}
                <UserCertificationTables data={certUniqueSort(data.certifications)} />
            
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

        </div>
    )
        
    
};

const UserCertificationTables = (certs) =>{
    const certifications = certs;
    const user = Auth.getProfile().data._id;
    const {loading, data} = useQuery(
        QUERY_REPORTING_STRUCTURE,
        {
        variables: {profileId: user}
        }
    );
    if(loading){
        return<div>Loading...</div>
    }
    
    // const tHead =(
    // <thead>
    //     <tr>
    //         <th>{profile.data.name}</th>
    //         <th>Class</th>
    //         <th>Certification</th>
    //         <th>Required</th>
    //         <th>Expiration Date</th>
    //         <th>Certified By</th>
    //         <th>Recertify</th>
    //     </tr>
    // </thead>)
    //     if(loading){
    //         return<div>loading...</div>
    //     } 
    //     console.log(profile.data)
    //     return<div><Table responsive="">{tHead}</Table></div>
    return(        
        
        <IndividualTable profileId={data.reportingStructure.profileId} certs={certifications}></IndividualTable>
    )
};

const IndividualTable = (userInformation) =>{



    const certificationMap = (certifications,profile) => {        
        console.log(certifications)
        console.log(profile)
        const rows = certifications.map((certification)=>{
            return(
                <tr key={certification._id}>
                    <th>{certification.certificationClass}</th>
                    <th>{certification.name}</th>
                    <th>
                    <ButtonGroup>
                        {["yes", "no"].map((radio, idx) => (
                        <ToggleButton
                            variant="outline-primary"
                            name="radio"
                            type="radio"
                            key={idx}
                            id={`radio-${idx}`}
                            value={radio.value}
                            // checked={}
                            // onChange={}
                        >
                            
                        </ToggleButton>
                        ))}
                    </ButtonGroup>
                    </th>
                    <th>4</th>
                    <th>5</th>
                    <th>
                    <Button variant="primary">Primary</Button>
                    </th>                    
                </tr>
            )
        })
        return(rows)
    };
    
    
    
    
    
    const certifications = userInformation.certs.data;
    const {loading, data} = useQuery(
        QUERY_SINGLE_PROFILE,
        {
        variables: {id: userInformation.profileId}
        }
    );
    if(loading){
        return<div>Loading...</div>
    }
    return(        
        
        <Table responsiveness="sm">
            <thead>
                <tr>
                    <th>{data.profile.name}</th>
                </tr>
                <tr>
                    <th>Class</th>
                    <th>Certification</th>
                    <th>Required</th>
                    <th>Expiration Date</th>
                    <th>Certified By</th>
                    <th>Recertify</th>
                </tr>
            </thead>
            <tbody>
                {certificationMap(certifications, data.profile)}
            </tbody>
        </Table>        
    )
}

export default CertificationsCertify;