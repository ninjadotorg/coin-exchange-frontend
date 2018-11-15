import React, { PureComponent } from 'react';
import Alert from '../../../../components/core/presentation/Alert';
import Navigation from '../../../../components/core/controls/Navigation';

class Layout extends PureComponent {
  render() {
    console.log('Layout', this.props);
    return (
      <div className="app">
        <div className="content">
          {this.props.children}
        </div>
        <Navigation />
        <Alert />
      </div>
    );
  }
}

export default Layout;
