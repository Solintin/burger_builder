import React from "react";
import Modal from "../../UI/Modal/Modal";

const errorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptor =  axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req
      });
      this.resInterceptor =  axios.interceptors.response.use(res => res, (error) => {
        this.setState({ error: error });
      });
    }
    //to prevent leakages and memory wastage unsubscribe from axios interceptors 
    // after component Unmount

    componentWillUnmount(){
      //call the interceptors instance/reference
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }
    

    closeErrorBackDrop = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <div>
          <Modal show={this.state.error} Clicked={this.closeErrorBackDrop}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default errorHandler;
