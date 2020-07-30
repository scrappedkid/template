import React, { Component } from 'react'
import { connect } from 'react-redux'
import Scrollbars from '@isomorphic/components/utility/customscrollbar'
import { InputSearch } from '@isomorphic/components/UIelements/input'
import mailList from '@isomorphic/components/mail/maillist'
import mailBuckets from '@isomorphic/components/mail/mailbuckets'
import mailTags from '@isomorphic/components/mail/mailtags'
import singleMail from '@isomorphic/components/mail/singlemail'
import ComposeBtn from '@isomorphic/components/mail/mailcomposebtn'
import ComposeMail from '@isomorphic/components/mail/composemail'
import PaginationControl from '@isomorphic/components/mail/mailpagination'
import IntlMessages from '@isomorphic/components/utility/intlmessages'
import mailActions from '@global/redux/mail/actions'
import mailSelector from '@global/redux/mail/selector'
import MailBox from './mailbox.style'

const {
  filterAction,
  selectMail,
  changeComposeMail,
  changeReplyMail,
  changeSearchString
} = mailActions

class DesktopView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: this.props.searchString
    }
  }

  render () {
    const {
      allMails,
      filterAttr,
      filterMails,
      selectedMail,
      composeMail,
      replyMail,
      selectMail,
      filterAction,
      changeComposeMail,
      changeReplyMail,
      changeSearchString
    } = this.props
    const { search } = this.state
    let singleMailComponent = (
      <p className='isoNoMailMsg'>
        <IntlMessages id='email.noMessage' />
      </p>
    )
    const index = allMails.findIndex(mail => mail.id === selectedMail)
    if (index !== -1) {
      singleMailComponent = singleMail(
        allMails,
        filterMails,
        index,
        replyMail,
        changeReplyMail,
        selectMail
      )
    }
    return (
      <MailBox className='isomorphicMailBox'>
        <div className='isoLeftWrapper'>
          <ComposeBtn changeComposeMail={changeComposeMail} />
          <div className='isoMailOptions'>
            <Scrollbars style={{ height: this.props.height - 70 }}>
              {mailBuckets(allMails, filterAction, filterAttr)}
              {mailTags(allMails, filterAction, filterAttr)}
            </Scrollbars>
          </div>
        </div>
        {composeMail ? (
          ''
        ) : (
          <div className='isoMiddleWrapper'>
            <div className='isoBucketLabel'>
              <h3>{filterAttr.bucket}</h3>
              <PaginationControl />
            </div>
            <div className='isoSearchMailWrapper'>
              <InputSearch
                placeholder='Search Email'
                value={search}
                className='isoSearchEmail'
                onChange={event =>
                  this.setState({ search: event.target.value })
                }
                onSearch={value => changeSearchString(value)}
              />
            </div>
            <Scrollbars>
              {mailList(filterMails, selectMail, selectedMail)}
            </Scrollbars>
          </div>
        )}
        <div className='isoSingleMailWrapper'>
          <Scrollbars style={{ height: this.props.height - 70 }}>
            {composeMail ? (
              <ComposeMail allMails={allMails} />
            ) : (
              singleMailComponent
            )}
          </Scrollbars>
        </div>
      </MailBox>
    )
  }
}

function mapStateToProps (state) {
  const {
    allMails,
    tag,
    selectedMail,
    filterAttr,
    composeMail,
    replyMail,
    searchString
  } = state.Mails
  return {
    allMails,
    tag,
    selectedMail,
    filterAttr,
    composeMail,
    replyMail,
    searchString,
    filterMails: mailSelector(state.Mails)
  }
}
export default connect(mapStateToProps, {
  filterAction,
  selectMail,
  changeComposeMail,
  changeReplyMail,
  changeSearchString
})(DesktopView)
