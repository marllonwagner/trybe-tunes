import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MusicCard from './components/MusicCard';
// import PropTypes from 'prop-types';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import { createUser } from './services/userAPI';
// import Loading from './pages/Loading';

class App extends Component {
  state = {
    isLoginBtnDisabled: true,
    isLoginBtnDisabled2: true,
    isLoading: false,
    nameInput: '',
    nameInput2: '',
    inputArtist: '',
    redirecter: false,
    arrayOfMusics: [],
    showResultText: false,
    emailInput: '',
    descriptionInput: '',
    nameEdited: '',
    imageInput: '',
  };

  onInputChange = (event) => {
    const value = event.target.value.length;
    const tres = 3;
    if (value >= tres) {
      this.setState({ isLoginBtnDisabled: false });
    } else {
      this.setState({ isLoginBtnDisabled: true });
    }
    this.setState({ nameInput: event.target.value });
  };

  onInputChange2 = (event) => {
    const value2 = event.target.value.length;
    const dois = 2;
    if (value2 >= dois) {
      this.setState({ isLoginBtnDisabled2: false });
    } else {
      this.setState({ isLoginBtnDisabled2: true });
    }
    this.setState({ nameInput2: event.target.value });
  };

  emailChange = (event) => {
    this.setState({ emailInput: event.target.value });
  };

  descriptChange = (event) => {
    this.setState({ descriptionInput: event.target.value });
  };

  nameChange = (event) => {
    this.setState({ nameEdited: event.target.value });
  };

  imageChange = (event) => {
    this.setState({ imageInput: event.target.value });
  };

  routeRedirect = () => {
    this.setState({ redirecter: true });
    // this.setState({ isLoading: false });
  };

  subInfos = async () => {
    const { nameInput } = this.state;
    // const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: nameInput,
      image: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' });
    this.setState({ isLoading: false });
    // history.push('/search');
    this.routeRedirect();
  };

  subInfos2 = async () => {
    const { nameInput2 } = this.state;
    this.setState({ isLoading: true });
    this.setState({ inputArtist: nameInput2 });
    this.setState({ nameInput2: '' });
    const response = await searchAlbumsAPI(nameInput2);
    this.setState({ arrayOfMusics: response });
    this.setState({ showResultText: true });
    console.log(response);

    // this.setState({ arrayOfMusics: response });
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoginBtnDisabled, isLoginBtnDisabled2, isLoading,
      nameInput, nameInput2, redirecter, inputArtist,
      arrayOfMusics, showResultText, emailInput, descriptionInput,
      nameEdited, imageInput } = this.state;
    return (
      <div>
        {/* {(isLoading === true) ? <Loading /> : <p />} */}
        <BrowserRouter>
          {redirecter && <Redirect to="/search" /> }
          <Switch>
            <Route
              exact
              path="/"
              // component={ Login }
              render={ (props) => (<Login
                { ...props }
                isLoginBtnDisabled={ isLoginBtnDisabled }
                onInputChange={ this.onInputChange }
                subInfos={ this.subInfos }
                isLoading={ isLoading }
                nameInput={ nameInput }

              />) }
            />
            <Route
              exact
              path="/search"
              // component={ Search }
              render={ (props) => (<Search
                { ...props }
                isLoginBtnDisabled2={ isLoginBtnDisabled2 }
                onInputChange2={ this.onInputChange2 }
                subInfos2={ this.subInfos2 }
                nameInput2={ nameInput2 }
                showResultText={ showResultText }
                arrayOfMusics={ arrayOfMusics }
                inputArtist={ inputArtist }

              />) }
            />
            <Route
              exact
              path="/album/:id"
              // component={ Album }
              render={ (props) => (<Album
                { ...props }
                subInfos3={ this.subInfos3 }
              />) }

            />
            <Route
              exact
              path="/favorites"
              render={ (props) => (<Favorites
                { ...props }

              />) }

            />
            <Route
              exact
              path="/profile"
              render={ (props) => (<Profile
                { ...props }
                emailInput={ emailInput }
                descriptionInput={ descriptionInput }
                nameEdited={ nameEdited }
              />) }

            />
            <Route
              exact
              path="/profile/edit"
              render={ (props) => (<ProfileEdit
                { ...props }
                emailChange={ this.emailChange }
                descriptChange={ this.descriptChange }
                nameChange={ this.nameChange }
                emailInput={ emailInput }
                descriptionInput={ descriptionInput }
                nameEdited={ nameEdited }
                imageChange={ this.imageChange }
                imageInput={ imageInput }

              />) }

            />
            <Route
              exact
              path=""
              component={ NotFound }
            />
            <Route
              exact
              path=""
              render={ (props) => (<MusicCard
                { ...props }
                subInfos3={ this.subInfos3 }
              />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

// App.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default App;
