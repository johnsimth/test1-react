import React from 'react';
import Auth from '../services/auth';
// import { connect } from 'react-redux';
// import validate from './validate';
// import actionCreator from '../redux/actions/user.actions';

// const mapStateToProps = state => {
//   return { loginFlag: state.loginFlag };
// };
// const mapDispatchToProps = dispatch => ({
//   login: userData => dispatch(actionCreator.login(userData))
// });

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   username: '',
    //   password: '',
    //   formErrors: { username: '', password: '' },
    //   formValid: { username: false, password: false }
    // };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
  }
  login(){
      console.log('login!!!!!!!!!!!!');
    let auth = new Auth();
    auth.login();
}
//   handleChange(e) {
//     const { name, value } = e.target;
//     this.setState({ [name]: value }, () => {
//       const { valid, error } = validate.validateField(name, value);
//       let formErrors = this.state.formErrors;
//       let formValid = this.state.formValid;
//       formValid[name] = valid;
//       formErrors[name] = error;
//       this.setState({
//         formErrors: formErrors,
//         formValid: formValid
//       });
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault(); //default prevent get method action
//     const { username, password } = this.state;
//     this.props.login({ username, password });
//   }
//   componentWillReceiveProps() {
//     this.props.history.push('/');
//   }
  render() {
    // const { username, password, formErrors, formValid } = this.state;
    return (
        <div>
            <div className="button" onClick={()=>this.login()}>Login</div>
        </div>
    //   <div className="row container">
    //     <div
    //       className="container col-lg-4 col-lg-offset-8 
    //       col-sm-6 col-sm-offset-6 log-in"
    //     >
    //       <form className="form" onSubmit={this.handleSubmit}>
    //         <h2>Sign in to FirstSite</h2>
    //         <div className="form-group">
    //           <label>Username</label>
    //           <input
    //             type="text"
    //             className="form-control"
    //             name="username"
    //             value={username}
    //             onChange={this.handleChange}
    //           />
    //           <div className="form-error">
    //             <p>{formErrors.username}</p>
    //           </div>
    //         </div>
    //         <div className="form-group">
    //           <label>Password</label>
    //           <input
    //             type="password"
    //             className="form-control"
    //             name="password"
    //             value={password}
    //             onChange={this.handleChange}
    //           />
    //           <div className="form-error">
    //             <p>{formErrors.password}</p>
    //           </div>
    //         </div>
    //         <div className="form-button">
    //           <button
    //             type="submit"
    //             className="btn btn-lg btn-success btn-block"
    //             disabled={!(formValid.username && formValid.password)}
    //           >
    //             Sign in
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    );
  }
}

export default Login;
