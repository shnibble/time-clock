import React from 'react'
import Styled from 'styled-components'
import Log from '../components/log'
import SessionToggle from '../components/sessionToggle'
import SessionClock from '../components/sessionClock'
import Wrapper from '../components/wrapper'
import SessionContext from '../context/session'

const Container = Styled.div`
    margin-right: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 720px) {
        display: block;
        margin: 0;
        justify-content: flex-start;
    }
`
const SessionContainer = Styled.div`
    padding: 15px;
    width: 300px;
    height: 250px;
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.25);

    @media screen and (max-width: 720px) {
        width: 100%;
        box-sizing: border-box;
    }
`
const SessionClockContainer = Styled.div`
    display: flex;
    justify-content: center;
`

const IndexPage = () => {
    return (
        <Wrapper title='Clock'>
            <SessionContext.Consumer>
                {session => (
                    <Container>
                        <SessionContainer>
                            <SessionToggle />
                            <SessionClockContainer>
                                {(session.session_active)
                                ?
                                <SessionClock />
                                :
                                null
                                }
                            </SessionClockContainer>
                        </SessionContainer>
                        <Log/>
                    </Container>
                )}
            </SessionContext.Consumer>
            
        </Wrapper>    
    )
}

export default IndexPage
