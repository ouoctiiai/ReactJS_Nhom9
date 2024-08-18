import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MainContainer = styled.div`
  background-color: aliceblue;
  
  h2 {
    font-weight: bold;
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
    font-weight: normal;
  }
  
  ul,
  li {
    list-style: none;
  }
  
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  ul li a {
    text-decoration: none;
    color: #000;
    background: #ffc;
    display: block;
    height: 10em;
    width: 10em;
    padding: 1em;
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    transform: rotate(-6deg);
    transition: transform .15s linear;
  }
  
  ul li {
    margin: 1em;
  }
  
  ul li:nth-child(even) a {
    transform: rotate(4deg);
    position: relative;
    top: 5px;
    background: #cfc;
  }
  
  ul li:nth-child(3n) a {
    transform: rotate(-3deg);
    position: relative;
    top: -5px;
    background: #ccf;
  }
  
  ul li:nth-child(5n) a {
    transform: rotate(5deg);
    position: relative;
    top: -10px;
  }
    
  .pin-icon{
    position: absolute;
    top: 0;
    left: 0;
  }
    
.heart-container {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    margin: 5px;
}
    .heart-item{
      margin-right: 5px;
    }

    .heart-quantity{
      font-size: 16px;
    }

`;

const MainBody = () => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push("/login");
  };
  return (
    <MainContainer>
      <h3>Questions for the group?</h3>
      <ul>
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}>
            <a href="#" contentEditable>
              <span className='pin-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16" transform="rotate(270)">
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                </svg>
              </span>
              <p>Text Content #{i + 1}</p>
              <div className='heart-container'>
                <span className='heart-item'><FaHeart /></span>
                <span className='heart-quantity'>15</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </MainContainer>
  );
};

export default MainBody;
