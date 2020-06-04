import React from 'react'
import Styled from 'styled-components'

const Container = Styled.section`

`

const Main = ({ children }) => (
    <Container role='main'>
        {children}
    </Container>    
)

export default Main
