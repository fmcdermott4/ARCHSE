import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const RenderedPdf = (pdf)=> {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
       setNumPages(numPages);
    }
    return (
      <div>
        <Row md="auto" className="justify-content-md-center">
          <ButtonGroup>
            <Button onClick={(e) => {e.preventDefault(); setPageNumber(Math.max((pageNumber - 1), 1))}} variant="primary">previous</Button>
            <Button onClick={(e) => {e.preventDefault(); setPageNumber(Math.min((pageNumber + 1), numPages))}}variant="primary">next</Button>
          </ButtonGroup>
        </Row>
        <Row md="auto" className="justify-content-md-center">
          <Document
            file={pdf.pdf}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <MyPage pageNumber={pageNumber}></MyPage>
          </Document>
        </Row>
        <Row md="auto" className="justify-content-md-center">
          <p>Page {pageNumber} of {numPages}</p>
        </Row>        
      </div>
    );
  }

const MyPage = (pageNumber) => {
  return(<Page pageNumber={pageNumber.pageNumber}></Page>)
}

export default RenderedPdf;