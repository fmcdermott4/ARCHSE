import React from 'react';
import RenderedPdf from '../components/RenderedPdf'

const GradingStandards = () => {
    return(
        <div>
            <RenderedPdf pdf={'../gradingStandards/' + 'NEWAIR_COMPACT_REFRIDGERATION_GRADING_STANDARDS.pdf'}/>
        </div>
    )    
}

// const MyDocument = ()=> {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
  
//     function onDocumentLoadSuccess({ numPages }) {
//       setNumPages(numPages);
//     }
  
//     return (
//       <div>
//         <Row md="auto" className="justify-content-md-center">
//           <ButtonGroup>
//             <Button onClick={(e) => {e.preventDefault(); setPageNumber(Math.max((pageNumber - 1), 1))}} variant="primary">previous</Button>
//             <Button onClick={(e) => {e.preventDefault(); setPageNumber(Math.min((pageNumber + 1), numPages))}}variant="primary">next</Button>
//           </ButtonGroup>
//         </Row>
//         <Row md="auto" className="justify-content-md-center">
//           <Document
//             file="../gradingStandards/NEWAIR_COMPACT_REFRIDGERATION_GRADING_STANDARDS.pdf"
//             onLoadSuccess={onDocumentLoadSuccess}
//           >
//             <MyPage pageNumber={pageNumber}></MyPage>
//           </Document>
//         </Row>
//         <Row md="auto" className="justify-content-md-center">
//           <p>Page {pageNumber} of {numPages}</p>
//         </Row>        
//       </div>
//     );
//   }

// const MyPage = (pageNumber) => {
//   return(<Page pageNumber={pageNumber.pageNumber}></Page>)
// }


















// function RenderPdf() {
    
    
    
    
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);

//     function onDocumentLoadSuccess({ numPages }) {
//         setNumPages(numPages);
//     }
//     const options = {
//         cMapUrl: 'cmaps/',
//         cMapPacked: true,
//       };
      
//     return (
//         <div>


//             <Row md="auto" className="justify-content-md-center">
//                 <ButtonGroup>
//                     <Button onClick={() => setPageNumber(Math.max((pageNumber - 1),1))} variant="primary">previous</Button>
//                     <Button onClick={() => setPageNumber(Math.min((pageNumber + 1),5))}variant="primary">next</Button>
//                 </ButtonGroup>
//             </Row> 
//             <Row>
                
//                     <iframe title="PDF" src="./NEWAIR_COMPACT_REFRIDGERATION_GRADING_STANDARDS.pdf" frameBorder="0" ></iframe>
                             
//             </Row>   
//             {/* <Row md="auto" className="justify-content-md-center">
//                 <Col>
//                     <Document      
//                     file="NEWAIR_COMPACT_REFRIDGERATION_GRADING_STANDARDS.pdf"
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     options={options}
//                     >
//                         <Page  pageNumber={pageNumber} />
//                     </Document>
//                     <p className="text-center">Page {pageNumber} of {numPages}</p>
//                 </Col> 
//                 <Col className="d-none d-xxl-block">
//                     <Document
//                     file={pdfFile}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     >
//                         <Page pageNumber={pageNumber+1} />
//                     </Document>                    
//                     <p className="text-center">Page {pageNumber+1} of {numPages}</p>
//                 </Col> 
//             </Row>             */}
//         </div>
//     );
// }

export default GradingStandards;