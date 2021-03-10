import { animated } from 'react-spring'
import styled, { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;

    user-select: none;
    background: lightblue;
    padding: 20px;
    display: flex;
  
    justify-content: center;
    flex-wrap: wrap;
  }
`
const Menu = styled.div`
height: 20%;
display: flex;
align-items: center;
justify-content: center;
@media only screen and (max-width: 750px) {
    height: 50%;

}
z-index: 20;

`
const Container = styled(animated.div)`
  position: relative;
  justify-self: flex-start;
  align-self: flex-start;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-gap: 25px;
  padding: 25px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: width, height;
    @media only screen and (max-width: 750px) {
    grid-auto-rows: auto;
grid-template-columns: 100%;
}
`

const Item = styled(animated.div)`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
    font-family: Permanent marker;
    color: black;

font-size: 20px;
  will-change: transform, opacity;
`
const Page = styled.div`
    margin: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
width: 90%;
position: absolute;
height: fit-content;
top:15%;
`

const Instruction = styled.div`
 background-color:white;
padding:0px 40px;
max-width: 40%;
min-width: 300px; 
border-radius: 10px;
`
export { Global, Container, Item, Page, Menu, Instruction}
