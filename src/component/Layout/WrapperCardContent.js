import React from "react";

const WrapperCardContent = (props)=> {
  return (
    <React.Fragment>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">{props.title}</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                 {props.children}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </section>
      </div>
    </React.Fragment>
  );
}


export default WrapperCardContent;