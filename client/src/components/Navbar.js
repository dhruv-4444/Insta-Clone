import React from "react";
import Logo from "../assets/img/logo1.png";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home2, SearchNormal, Export } from "iconsax-react";

import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <ContentWrapper>
        <LogoWrapper>
          <img src={Logo} className="logo" alt="everstory-logo" />
          <h4 className="logo-name">EverStory</h4>
        </LogoWrapper>

        <NavItems>
          <NavItem>
            <NavLink
              to="/"
              activestyle={{
                fontWeight: "bold",
                color: "#399ffd",
              }}
            >
              <Home2 size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/search" activeclassname="selected">
              <SearchNormal size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/create" activeclassname="selected">
              <Export size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/user/${user._id}`}>
              <img className="profile" src={user?.avatar} alt="profile" />
            </NavLink>
          </NavItem>
        </NavItems>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Navbar;

// Styled Components

const Wrapper = styled.div`
  height: 100px;
  background: linear-gradient(135deg, #f6f9ff, #e1ecf7);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .logo {
    width: 62px;
    height: 62px;
    object-fit: contain;
  }

  .logo-name {
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-size: 30px;
    color: #222;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;

  @media only screen and (max-width: 640px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0 12px;

  .selected {
    color: #399ffd;
  }

  a {
    text-decoration: none;
    color: black;
    font-family: "Poppins";
    transition: all 0.3s ease-in-out;

    .profile {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
    }

    &:hover {
      color: #399ffd;
    }
  }
`;
