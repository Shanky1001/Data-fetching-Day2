
import { useState } from 'react';
import './App.css';
function App() {

  const [loader, setLoader] = useState(false)


  // Form Handling function
  const formHandle = (e) => {
    e.preventDefault();
    setLoader(true);
    fetch('https://fbapi.sellernext.com/user/login?', {
      method: 'POST',
      headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA'
      },
      body: new FormData(e.target)
    })
      .then(response => response.json())
      .then(json => {
        setLoader(false)
        if (json.success) {
          alert(`${json.message}`);
          sessionStorage.setItem('user', json.data.token);
          console.log(sessionStorage.getItem('user'));
        } else {
          alert(`${json.message}`)
        }
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  return (
    <div className="App">
      <form onSubmit={formHandle}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
          <input type="text" className="form-control" name='username' aria-describedby="usenameHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary" >Login</button>
      </form>
      <div style={{position:"fixed",zIndex:"100",top:"30vh",left:"30%"}}>
        {loader && <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' alt='loading' />}
      </div>
    </div>
  );
}

export default App;
