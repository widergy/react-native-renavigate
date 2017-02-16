import React, { Component } from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { View } from 'react-native';

import TabContainer from './TabContainer';
import RootScene from './RootScene';
import { actionCreators } from './actions';
import { propTypes as navigationPropTypes } from './reducer';

class TabsContainer extends Component {

  constructor(props) {
    super(props);
    this.initialTab = props.activeTabIndex || props.initialTab;
    props.dispatch(actionCreators.initTabs(props.tabs.length, this.initialTab));
  }

  getTabsComponent(tabs) {
    return (
      <ScrollableTabView
        {...this.props.tabsComponentProps}
        onChangeTab={this.handleTabChanged}
        initialPage={this.initialTab}
        page={this.props.activeTabIndex}
        renderTabBar={(props) => {
          if (this.props.shouldHideTabBar && !this.props.alwaysShowTabBar) {
            return <View />;
          }
          if (this.props.tabsComponentProps.renderTabBar) {
            return this.props.tabsComponentProps.renderTabBar(props);
          }
          return <DefaultTabBar {...props} />;
        }}
        locked={this.props.shouldHideTabBar && !this.props.alwaysShowTabBar}
      >
        {
          tabs.map((tab, index) => {
            return this.getTabComponent(tab, index);
          }
        )}
      </ScrollableTabView>
    );
  }

  getTabComponent(tab, index) {
    return (
      <TabContainer
        key={tab.label}
        tabLabel={tab.label}
        tabIndex={index}
        initialRoute={tab.initialRoute}
        routeDefs={this.props.routeDefs}
        decorateRouteComponent={this.props.decorateRouteComponent}
        navigationBar={this.props.navigationBar}
        navigationBarStyle={this.props.navigationBarStyle}
        navigationStyles={this.props.navigationStyles}
        defaultTransition={this.props.defaultTransition}
      />
    );
  }

  handleTabChanged = ({ i }) => {
    if (this.props.tabsComponentProps.onChangeTab) {
      this.props.tabsComponentProps.onChangeTab({ i });
    }
    this.props.dispatch(actionCreators.tabChanged(i));
  }

  render() {
    return this.getTabsComponent(this.props.tabs);
  }
}

TabsContainer.defaultProps = {
  initialTab: 0,
  tabsComponentProps: {},
  alwaysShowTabBar: false
};

TabsContainer.propTypes = {
  activeTabIndex: React.PropTypes.number,
  initialTab: React.PropTypes.number.isRequired,
  tabs: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      initialRoute: navigationPropTypes.initialRoute,
      label: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  tabsComponentProps: React.PropTypes.shape(ScrollableTabView.propTypes).isRequired,
  alwaysShowTabBar: React.PropTypes.bool,
  ...RootScene.propTypes
};

const mapStateToProps = (store) => {
  return {
    activeTabIndex: store.navigation.activeTabIndex,
    shouldHideTabBar: store.navigation.shouldHideTabBar
  };
};

export default connect(mapStateToProps)(TabsContainer);
