import React from 'react'
import Styled from 'styled-components'
import SessionContext from '../context/session'

const Container = Styled.div`

`
const ButtonsContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`
const StartSessionButton = Styled.button`
    padding: 5px;
    background: transparent;
    color: #009933;
    border: 2px solid #009933;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        background: #009933;
        color: #fff;
    }

    &:disabled {
        background: #ccc;
        border-color: #ccc;
        color: #f2f2f2;
        cursor:not-allowed;
    }
`
const EndSessionButton = Styled.button`
    padding: 5px;
    background: transparent;
    color: #e60000;
    border: 2px solid #e60000;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        background: #e60000;
        color: #fff;
    }

    &:disabled {
        background: #ccc;
        border-color: #ccc;
        color: #f2f2f2;
        cursor:not-allowed;
    }
`
const TaskContainer = Styled.div`
    text-align: center;
    padding: 5px;
`
const Input = Styled.input`
    padding: 5px;
    text-align: center;
    background: #f2f2f2;
    border: none;
    border-bottom: 1px solid #ccc;
    transition: all .25s ease;

    &:hover, &:focus {
        border-color: green;
        outline: none;
    }
`

const SessionToggle = () => (
    <SessionContext.Consumer>
        {session => (
            <Container>
                <ButtonsContainer>
                    <StartSessionButton onClick={session.startSession} disabled={session.session_active}>Start Session</StartSessionButton>
                    <EndSessionButton onClick={session.endSession} disabled={!session.session_active}>End Session</EndSessionButton>
                </ButtonsContainer>
                <TaskContainer>
                    <Input type='text' placeholder='Task' value={session.active_session_task} onChange={session.updateActiveSessionTask} />
                </TaskContainer>
            </Container>
        )}
    </SessionContext.Consumer>
)

export default SessionToggle
