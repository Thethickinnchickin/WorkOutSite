import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Component } from 'react';


class App extends Component {
  state = {
    data : null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if(response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  render() {
    return (
      <body class="text-center" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="">
    
      <main class="form-signin col-4 mt-5 m-auto">
        <form>
          <img class="mb-4" src="images/workoutsitelogo.png" alt="" width="72" height="57"/>
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-4">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
          </div>
      
          <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </main>
      
      
          
        
      
      </body>
    );
  }
  
}




export default App;
