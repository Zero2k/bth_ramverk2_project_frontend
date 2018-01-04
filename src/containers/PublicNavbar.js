import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Container, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Root = styled.div`
  padding-top: 10px;
`;

const NavLink = () => ({
  render() {
    const isActive = this.context.router.route.location.pathname === this.props.to;
    const className = isActive ? 'active' : '';

    return (
      <Menu.Item as={Link} className={className} {...this.props}>
        {this.props.children}
      </Menu.Item>
    );
  }
});

const Navbar = () => (
  <Root>
    <Container>
      <Menu inverted pointing secondary size="large" style={{ borderWidth: '0px' }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <Menu.Item position="right">
          <Button as={Link} to="/login" inverted>
            Log in
          </Button>
          <Button as={Link} to="/signup" inverted style={{ marginLeft: '0.5em' }}>
            Sign Up
          </Button>
        </Menu.Item>
      </Menu>
    </Container>
  </Root>
);

NavLink.contextTypes = {
  router: PropTypes.object
};

export default Navbar;
