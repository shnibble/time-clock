import React from 'react'
import Styled from 'styled-components'
import moment from 'moment'
import SessionContext from '../context/session'
import TrashCanImgSrc from '../images/trash-can.png'

const Container = Styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 220px;
    padding: 15px;
    background: #f2f2f2;
    overflow-y: auto;
    box-shadow: -2px 0 3px 1px rgba(0,0,0,0.25);

    @media screen and (max-width: 720px) {
        position: static;
        width: 100%;
        box-sizing: border-box;
        overflow-y: hidden;
        box-shadow: none;
        height: 100%;
    }
`
const Title = Styled.h2`
    text-align: center;
`
const List = Styled.ul`
    list-style-type: none;
`
const DateHeader = Styled.li`
    font-weight: bold;
`
const Item = Styled.li`
    background: #ccc;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr 30px;
`
const ItemTitle = Styled.h3`
    font-size: 16px;
    font-weight: bold;
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
`
const ItemDetails = Styled.div`
    padding: 5px;
`
const DeleteButton = Styled.button`
    margin: 2px;
    width: 30px;
    height: 30px;
    background: url(${TrashCanImgSrc});
    background-position: center;
    background-size: 100%;
    border: none;
    position: relative;
    cursor: pointer;
    opacity: 0.5;
    transition: all .25s ease;

    &:hover, &:focus {
        opacity: 1;
        outline: none;
    }
`

const Log = () => {
    let i = 0
    let previousDate = ''

    return (
        <SessionContext.Consumer>
            {session => (
                <Container>
                    <Title>Log</Title>
                    <List>
                        {session.past_sessions.map(sess => {
                            let date = moment(sess.start).format('dddd MM/DD/YYYY')
                            const start = moment(sess.start).format('hh:mm a')
                            const end = moment(sess.end).format('hh:mm a')

                            if (i === 0) {
                                i++
                                previousDate = date
                                return (
                                    <React.Fragment key={sess.id}>
                                        <DateHeader>{date}</DateHeader>
                                        <Item>
                                            <ItemTitle>{sess.task}</ItemTitle>
                                            <ItemDetails>
                                                <p>{`${start} - ${end}`}</p>
                                                <p>Work: {sess.work}</p>
                                                <p>Break: {sess.break}</p>
                                            </ItemDetails>
                                            <DeleteButton value={sess.id} onClick={session.deletePastSession}>
                                            </DeleteButton>
                                        </Item>
                                    </React.Fragment>
                                )
                            } else {
                                if (previousDate !== date) {
                                    previousDate = date
                                    return (
                                        <React.Fragment key={sess.id}>
                                            <DateHeader>{date}</DateHeader>
                                            <Item>
                                                <ItemTitle>{sess.task}</ItemTitle>
                                                <ItemDetails>
                                                    <p>{`${start} - ${end}`}</p>
                                                    <p>Work: {sess.work}</p>
                                                    <p>Break: {sess.break}</p>
                                                </ItemDetails>
                                                <DeleteButton value={sess.id} onClick={session.deletePastSession}>
                                                </DeleteButton>
                                            </Item>
                                        </React.Fragment>
                                    )
                                } else {
                                    return (
                                        <Item key={sess.id}>
                                            <ItemTitle>{sess.task}</ItemTitle>
                                            <ItemDetails>
                                                <p>{`${start} - ${end}`}</p>
                                                <p>Work: {sess.work}</p>
                                                <p>Break: {sess.break}</p>
                                            </ItemDetails>
                                            <DeleteButton value={sess.id} onClick={session.deletePastSession}>
                                            </DeleteButton>
                                        </Item>
                                    )
                                }
                            }
                        })}
                    </List>
                </Container>
            )}
        </SessionContext.Consumer>
    )
}

export default Log
