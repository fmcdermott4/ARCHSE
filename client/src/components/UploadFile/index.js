import React from 'react';
import { gql } from '@apollo/client';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const UploadFile = () =>{
    
    
    
    
    
    
    
    return(
        <div class="container">
            <div class="row">
                <div class="col-md-6 m-auto">
                    <h1 class="my-4">Lets upload some stuff</h1>
                    <form action="/upload" method="post" enctype="multipart/form-data">
                        <div class="custom-file mb-3">
                            <input type="file" class="custom-file-input" name="file" id="file1" onchange="readSingleFile(this.files)" />
                            <label class="custom-file-label" for="file1" id="file-label">Choose file</label>
                        </div>
                        <input type="submit" value="Submit" class="btn btn-primary btn-block" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadFile;