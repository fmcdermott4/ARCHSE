import React from 'react';
import { Link } from 'react-router-dom'

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
            <div key={category._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {category.category} <br />
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${category._id}`}
                >
                  Conduct audit
                </Link>
              </div>
            </div>
          ))}
      </div>
        </div>
    )
};

export default AvailableAudits;