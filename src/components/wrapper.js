import React from 'react'
import Styled from 'styled-components'
import SEO from './seo'
import Header from './header'
import Main from './main'
import Footer from './footer'
import './wrapper.css'

const Container = Styled.div`

`

const Wrapper = ({ title, children }) => (
    <Container>
        <SEO title={title} />
        <Header />
        <Main>
            {children}
        </Main>
        <Footer />
    </Container>
)

export default Wrapper
