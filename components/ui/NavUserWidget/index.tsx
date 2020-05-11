import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import SignIn from '../Auth/Login'
import { logoutUser } from '../../../redux/auth/service'
import { selectAuthState } from '../../../redux/auth/selector'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Avatar from '@material-ui/core/Avatar'
import { showDialog } from '../../../redux/dialog/service'

import './style.scss'
import { User } from 'interfaces/User'
import { AuthUser } from 'interfaces/AuthUser'
// Get auth state from redux
// Get user email address
// If not logged in, show login
// If logged in, show email address and user icon

type Props = {
  auth: any
  logoutUser: typeof logoutUser
  showDialog: typeof showDialog
}

const mapStateToProps = (state: any) => {
  return {
    auth: selectAuthState(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: bindActionCreators(logoutUser, dispatch),
  showDialog: bindActionCreators(showDialog, dispatch)
})

class NavUserBadge extends Component<Props> {
  styles = {
    loginButton: {
      color: 'white'
    },
    logoutButton: {
      color: 'white'
    }
  }

  handleLogout() {
    console.log('logout')
    this.props.logoutUser()
  }

  render() {
    const isLoggedIn = this.props.auth.get('isLoggedIn')
    const user = this.props.auth.get('user') as User
    const authUser = this.props.auth.get('authUser') as AuthUser
    const userName =
      authUser && authUser.identityProvider ? authUser.identityProvider.token : 'User'
    const avatarLetter = userName ? userName.substr(0, 1) : 'X'

    return (
      <div className="userWidget">
        {isLoggedIn && (
          <div className="flex">
            <Button onClick={() => this.handleLogout()}
              style={this.styles.logoutButton}
            >
              {userName}
              <br />
              Logout
            </Button>
            {user && user.avatar ? (
              <Avatar alt="User Avatar Icon" src={user.avatar} />
            ) : (
              <Avatar alt="User Avatar">{avatarLetter}</Avatar>
            )}
          </div>
        )}
        {!isLoggedIn && (
          <Button
            style={this.styles.loginButton}
            onClick={() => this.props.showDialog({
              children: (
                <SignIn />
              )
            })}
          >
            Log In
          </Button>
        )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavUserBadge)
