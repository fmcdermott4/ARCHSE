import React from 'react';
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

const AvailableAudits = ({categories, title}) => {
    if(!categories.length) {
        return<h3>No available audits yet</h3>;
    }

    return(    
        <div>
            <h3 className="text-primary">{title}</h3>
            <div className="flex-row justify-space-between my-4">
        {categories &&
          categories.map((category) => (
            <div key={category._id} >
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {category.category} <br />
                </h4>
                <Row>
                  <Col> 
                    <Link className="btn btn-block btn-squared btn-light text-dark" to={`/audits/${category._id}`}>
                      Conduct audit
                    </Link>
                  </Col>
                  <Col>
                    <Link className="btn btn-block btn-squared btn-light text-dark" to={`/audits/auditresults/category/${category._id}`}>
                        View Audits
                    </Link>
                  </Col> 
                </Row>
              </div>
            </div>
          ))}
      </div>
        </div>
    )
};

export default AvailableAudits;