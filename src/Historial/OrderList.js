import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  ActivityIndicator,
} from 'react-native'
import NoOrders from './NoOrders'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'
import { getRecords } from '../utils/api'
import { getDateMD } from '../utils/helpers'

class OrderList extends Component {
  constructor(){
    super()
    this.state = {
      loading: false,
      page: 1,
      error: null,
      data:[],
      refreshing: true,
      qty: 10,
      fetchMore: true
    }
  }

  componentDidMount() {
    this._makeRecordsRequest()
  }

  _makeRecordsRequest = () => {
    const { page, qty } = this.state
    this.setState({ loading: true })
    getRecords(this.props.user.tokenUID, page, qty)
      .then(records => {
        this.setState({
          data: [...this.state.data, ...records.data],
          loading:false,
          refreshing: false
        })
        if(records.data.length < qty)
        console.log('entro: ', this.state.fetchMore)
        this.setState({
          data: [...this.state.data, ...records.data],
          loading:false,
          refreshing: false,
          fetchMore: false
        })
        console.log('salio: ', this.state.fetchMore)
      })
      .catch(err => {
        this.setState({
          error: err,
          loading: false,
          refreshing: false
        })
      })

  }

  _handleLoadMore = () => {
    if(this.state.fetchMore)
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this._makeRecordsRequest()
        }
      )
  }

  _renderFooter = () => {
    if (!this.state.loading && this.state.fetchMore) return null
    else if(!this.state.fetchMore) return <View style={{paddingBottom: 10, justifyContent:'center', alignItems:'center'}}><Text style={{fontFamily:'roboto', fontSize:12}}>No hay más resultados</Text></View>
    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
    
      <ActivityIndicator animating size="large" />

      </View>
    )
  }

  render () {
  /*if(this.props.waiting.length === 0)
    return <NoOrders/>
  else */
    return (
      <SectionList
        ListFooterComponent={this._renderFooter}
        refreshing={this.state.refreshing}
        onRefresh={()=>{}}
        style={{flex:1}}
        onEndReached={this._handleLoadMore}
        onEndReachedThreshold={0.01}
        stickySectionHeadersEnabled={true}
        renderItem={({item, index, section}) =>
            <OrderItem records={item}/>
          }
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.sectionHeader}>
            <Text style={{color:'#777879', fontSize:16, fontFamily:'roboto-bold'}}>{title}</Text>
          </View>
        )}
        sections={[
          { title: 'Title1', data: this.state.data },
        ]}
        keyExtractor={(item, index) => item + index}
      />
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    justifyContent:'center',
    alignItems:'center',
    height:55, paddingBottom:10,
    paddingTop:20, backgroundColor:'white',
    marginBottom:3,
    elevation:2,
    shadowColor:'black',
    shadowOffset: {width:0, height:3},
    shadowOpacity:0.1,
    shadowRadius:2,
  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(OrderList)