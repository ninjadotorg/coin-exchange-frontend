import React from 'react';
import { connect } from 'react-redux';
import { getProfileAction }from 'src/screens/auth/redux/action';
import { Container } from 'react-bootstrap';
import Loading from 'src/components/loading';
import detectWindow from 'src/screens/app/components/Layout/styles.scss';
import style from './style.scss';
// import TabNavigation from './navigation/TabNavigation';
import SideBarNavigation from './navigation/SideBarNavigation';

class Me extends React.PureComponent {
  state = {
    loading: true,
  }
  componentDidMount() {
    // eslint-disable-next-line
    this.props.getProfileAction().then(() => this.setState({ loading: false })).catch(err=>err);
  }
  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (
      <div className={style.LoadingContainer}>
        <Loading />
      </div>);
    return (
      <div className={style.me}>
        <Container>
          <div className={detectWindow.desktop} style={{ height: '100%' }}>
            <SideBarNavigation {...this.props} />
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(null, { getProfileAction })(Me);
