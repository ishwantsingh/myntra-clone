import React from "react";

import heartIcon from "../../assets/heartIcon.png";
import personIcon from "../../assets/personIcon.png";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  background-color: white;
  .image1 {
    margin: 0 auto;
    width: 100%;
  }
  .seachBar {
    margin: 0 auto;
  }
`;

const StyledLogos = styled.div`
  display: flex;
  padding: 0 0 0 30px;
  align-items: center;
`;

const InstaIcon = styled.img`
  width: 31.438px;
  height: 31.438px;
`;

const VerticalRule = styled.h1`
  margin: 0 20px;
  font-size: 25px;
  font-weight: normal;
`;

const InstaLogo = styled.img`
  width: 94.328px;
  height: 33.672px;
`;

const StyledInput = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 90%;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(230, 230, 230);
  border-radius: 3px;
  margin: 0em auto;
  padding: 0px;
  display: flex;
  align-self: flex-start;
  text-align: center;
`;

const StyledIcons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 5%;
`;

const HeartIcon = styled.img`
  width: 38.19px;
  height: 38.19px;
`;

const PersonIcon = styled.img`
  width: 38.19px;
  height: 38.19px;
`;

const CircleIcon = styled.img`
  width: 38.19px;
  height: 38.19px;
`;

function SearchBar(props) {
  return (
    <StyledSearchBar>
      {/* <StyledLogos>
        <InstaIcon src={instaIcon} />
        <VerticalRule>|</VerticalRule>
        <InstaLogo src={logo} />
      </StyledLogos> */}
      <StyledInput>
        <SearchInput
          type="text"
          placeholder="Search for products, brands and more"
          onKeyDown={props.searchPosts}
        />
      </StyledInput>

      <StyledIcons>
        <PersonIcon src={personIcon} />
        <HeartIcon src={heartIcon} />
      </StyledIcons>
    </StyledSearchBar>
  );
}

export default SearchBar;