import React, {useState} from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import pdfFile from './NEWAIR_COMPACT_REFRIDGERATION_GRADING_STANDARDS.pdf';
import {Row, Col} from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const GradingStandards = () => {

    
    return(
        <div>
            <RenderPdf />
        </div>
    )
        
    
}

function RenderPdf() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    return (
        <div>
            <Row md="auto" className="justify-content-md-center">
                <ButtonGroup>
                    <Button onClick={() => setPageNumber(Math.max((pageNumber - 1),1))} variant="primary">previous</Button>
                    <Button onClick={() => setPageNumber(Math.min((pageNumber + 1),5))}variant="primary">next</Button>
                </ButtonGroup>
            </Row>    
            <Row md="auto" className="justify-content-md-center">
                <Col>
                    <Document      
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page  pageNumber={pageNumber} />
                    </Document>
                    <p className="text-center">Page {pageNumber} of {numPages}</p>
                </Col>
                    {/* <Col className="d-none d-xxl-block">
                        <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page pageNumber={pageNumber+1} />
                        </Document>                    
                        <p className="text-center">Page {pageNumber+1} of {numPages}</p>
                    </Col> */}
            </Row>
            
        </div>
    );
}

export default GradingStandards;