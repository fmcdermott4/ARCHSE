import React, { useState, useCallback, useMemo } from 'react';
import { gql, useMutation } from '@apollo/client';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {UPLOAD_SINGLE_FILE} from '../../utils/mutations';
import Dropzone, {useDropzone} from "react-dropzone"

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

const UploadFile = (props) =>{
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone();
    
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);
  
    const files = (upload) =>{
        if(upload){
            return(
                upload.map(file => (
                    <li key={file.path}>
                        {file.path} - {file.size} bytes
                    </li>
                ))
            )
        } else {
            return(<div />)
        }
    } 
    

    const [upload, setUpload] = useState(null); 

    return (
        <div className="container">
            <Dropzone onDrop={acceptedFiles => {console.log(acceptedFiles); setUpload(acceptedFiles)}}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                
                )}
                
            </Dropzone>
            <aside>
                <h4>Files</h4>
                <ul>{files(upload)}</ul>
            </aside>
      </div>
    );






    // const onDrop = useCallback(acceptedFiles => {
    //     acceptedFiles.forEach((file) => {
    //         const reader = new FileReader();
      
    //         reader.onabort = () => console.log('file reading was aborted');
    //         reader.onerror = () => console.log('file reading has failed');
    //         reader.onload = () => {
    //         // Do whatever you want with the file contents
    //           const binaryStr = reader.result;
    //           console.log(binaryStr);
    //         }
    //         reader.readAsArrayBuffer(file);
    //       })
    //   }, [])
    // const [upload, setUpload] = useState(null);  
    // const {getRootProps, getInputProps, isDragActive} = useDropzone()
    
    // return(
    //     <div>
    //         <Dropzone onDrop={acceptedFiles => setUpload(acceptedFiles)}>
    //             {({getRootProps, getInputProps}) => (
    //                 <section>
    //                 <div {...getRootProps()}>
    //                     <input {...getInputProps()} />
    //                     <p>Drag 'n' drop some files here, or click to select files</p>
    //                 </div>
    //                 </section>
    //             )}
    //         </Dropzone>
    //     </div>
    // )
}

export default UploadFile;