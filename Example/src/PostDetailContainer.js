import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { actionCreators } from './src/actions';

class PostDetailContainer extends Component {

  backToList = () => {
    this.props.dispatch(actionCreators.pop());
  }

  render() {
    return (
      <View style={{ marginTop: 60 }}>
        <TouchableOpacity
          onPress={this.backToList}
          style={{ margin: 30 }}
        >
          <Text style={{ fontWeight: 'bold' }}>Go back to list</Text>
        </TouchableOpacity>
        <Text style={{ margin: 30 }}>
          { this.props.text }
        </Text>
      </View>
    );
  }
}

PostDetailContainer.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default connect()(PostDetailContainer);
