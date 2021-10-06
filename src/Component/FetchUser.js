import React, { Component } from 'react';

export class FetchUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: null,
      counter: 1
    };
    // this.update = this.update.bind(this);
    // this.next = this.next.bind(this);
    // this.prev = this.prev.bind(this);
  }

  update = x => {
    for (let i = 0; i < 1; i++) {
      if (x === 1) {
        this.setState({ counter: this.state.counter + 1 });
      } else if (x === 0) {
        this.setState({ counter: this.state.counter - 1 });
      }
      this.apiFetch();
      console.log(this.state.counter);
    }
  };
  prev = () => {
    for (let i = 0; i < 1; i++) {
      if (this.state.counter >= 2) {
        return;
      } else {
        this.setState({ counter: this.state.counter + 1 });
        this.apiFetch();
        console.log(this.state.counter + ' prev');
      }
    }
  };
  next = () => {
    for (let i = 0; i < 1; i++) {
      if (this.state.counter <= 1) {
        return;
      } else {
        this.setState({ counter: this.state.counter - 1 });
        this.apiFetch();
        console.log(this.state.counter + '  next');
      }
    }
    // this.comp(this.state.counter);
  };

  // async apiFetch() {
  //   let url = `https://reqres.in/api/users?page=` + this.state.counter;
  //   console.log(url);
  //   const response = await fetch(url);
  //   const users = await response.json();
  //   this.setState({ users: users.data, loading: false });
  //   console.log(this.state.users);
  // }
  async apiFetch() {
    let url = `https://reqres.in/api/users?page=${this.state.counter}`;
   // let url2 = `https://reqres.in/api/users?page=2`;

    console.log(url);
    const response = await fetch(url);
    //const response2 = await fetch(url2);

    const users = await response.json();
    //const users2 = await response2.json();

    this.setState({ users: users.data, loading: false });
    //this.setState({ users: [...this.state.users, ...users2.data] });

    console.log(this.state.users);
  }
  componentDidMount() {
    this.apiFetch();
  }

  render() {
    // if (this.state.users) {
    //   return <div>LOADING...</div>;
    // }

    if (!this.state.users) {
      return <div className="">Didn't get a person</div>;
    }
    return (
      <div>
        <div className="pagination">
          <button onClick={this.prev}>pervious</button>
          <button onClick={this.next}>next</button>
        </div>
        <section className="card">
          <div className="card__container bd__container">
            {this.state.users.map((user, index) => (
              <div key={index} className="card__glass">
                <img src={user.avatar} alt="pic" className="card__img" />
                <div className="card__data">
                  <h3 className="card__title">
                    {user.id}. {user.first_name} {user.last_name}{' '}
                  </h3>
                  <span className="card__profession">{user.email}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* {this.state.users.map((user, index) => (
          <div key={index}>
            <div>{user.id}</div>
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
            <div>{user.email}</div>
            <img src={user.avatar} alt="" />
          </div>
        ))} */}
      </div>
    );
  }
}

export default FetchUser;

