import styled from 'styled-components';

export const Button = styled.button`
display: inline-block;
padding: 3px 12px;
font-size: 14px;
font-family: Arial, sans-serif;
line-height: 1.5;
color: white;
background-color: #8bc34a;
border: none;
border-radius: 4px;
:not(:disabled) {
  cursor: pointer;
}
:hover {
  background-color: #5a6268;
}
`


export const DisabledButton = styled.button`
display: inline-block;
padding: 3px 12px;
font-size: 14px;
font-family: Arial, sans-serif;
line-height: 1.5;
color: white;
background-color: lightgrey;
border: none;
border-radius: 4px;
:not(:disabled) {
  cursor: pointer;
}
:hover {
  background-color: #5a6268;
}
`