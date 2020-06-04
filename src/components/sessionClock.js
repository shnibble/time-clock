import React from 'react'
import Styled from 'styled-components'
import SessionContext from '../context/session'
import addNotification from 'react-push-notification'

const Container = Styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`
const TimerContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`
const ClockBackground = Styled.div`
    background: #000;
    padding: 5px;
    border-radius: 4px;
`
const ClockText = Styled.p`
    font-family: "Courier New", Courier, monospace;
    color: #fff;
`
const WorkButton = Styled.button`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 5px;
    border: none;
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.25);
    background: #009933;
    color: #fff;
    cursor: pointer;
    transition: all .25s ease;

    &:disabled {
        background: #b3b3b3;
        color: #737373;
        box-shadow: inset 2px 2px 3px 1px rgba(0,0,0,0.25);
        cursor:not-allowed;
    }
`
const BreakButton = Styled.button`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 5px;
    border: none;
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.25);
    background: #ff9900;
    color: #fff;
    cursor: pointer;
    transition: all .25s ease;

    &:disabled {
        background: #b3b3b3;
        color: #737373;
        box-shadow: inset 2px 2px 3px 1px rgba(0,0,0,0.25);
        cursor:not-allowed;
    }
`
const LimitContainer = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const LimitLabel = Styled.span`

`
const LimitSelect = Styled.select`
    margin: 5px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid #ccc;
    background: #f2f2f2;
    cursor: pointer;

    &:hover, &:focus {
        border-color: green;
        outline: none;
    }
`

class SessionClock extends React.Component {

    state = {
        limits: [
            'none',
            '00:05:00',
            '00:10:00',
            '00:15:00',
            '00:20:00',
            '00:25:00',
            '00:30:00',
            '01:00:00',
            '02:00:00'
        ],
        work_limit: 'none',
        work_seconds: 0,
        work_minutes: 0,
        work_hours: 0,
        break_limit: 'none',
        break_seconds: 0,
        break_minutes: 0,
        break_hours: 0
    }

    workLimitTick = () => {
        let seconds = this.state.work_seconds + 1
        let minutes = this.state.work_minutes
        let hours = this.state.work_hours

        // check if seconds over a minute
        if (seconds > 59) {

            // reset seconds back to 0
            seconds = 0

            // update minutes
            minutes++
        }

        // check if minutes over an hour
        if (minutes > 59) {

            // reset minutes back to 0

            // update hours
            hours++
        }

        const work_limit = this.state.work_limit
        const paddedSeconds = (seconds < 10)?'0'+seconds:seconds
        const paddedMinutes = (minutes < 10)?'0'+minutes:minutes
        const paddedHours = (hours < 10)?'0'+hours:hours
        const time = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
        
        this.setState({
            work_seconds: seconds,
            work_minutes: minutes,
            work_hours: hours
        })

        // push notification
        if (time === work_limit) {
            addNotification({
                title: 'Work Session Clock',
                subtitle: 'Work Limit Reached',
                message: 'Your work limit timer has been reached!',
                native: true
            })
        }
    }

    breakLimitTick = () => {
        let seconds = this.state.break_seconds + 1
        let minutes = this.state.break_minutes
        let hours = this.state.break_hours

        // check if seconds over a minute
        if (seconds > 59) {

            // reset seconds back to 0
            seconds = 0

            // update minutes
            minutes++
        }

        // check if minutes over an hour
        if (minutes > 59) {

            // reset minutes back to 0

            // update hours
            hours++
        }

        const break_limit = this.state.break_limit
        const paddedSeconds = (seconds < 10)?'0'+seconds:seconds
        const paddedMinutes = (minutes < 10)?'0'+minutes:minutes
        const paddedHours = (hours < 10)?'0'+hours:hours
        const time = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
        
        this.setState({
            break_seconds: seconds,
            break_minutes: minutes,
            break_hours: hours
        })

        // push notification
        if (time === break_limit) {
            addNotification({
                title: 'Work Session Clock',
                subtitle: 'Break Limit Reached',
                message: 'Your break limit timer has been reached!',
                native: true
            })
        }
    }

    workTick = () => {
        let session = this.context

        // call work limit tick
        this.workLimitTick()

        let seconds = session.work_timer_seconds + 1
        let minutes = session.work_timer_minutes
        let hours = session.work_timer_hours

        // check if seconds over a minute
        if (seconds > 59) {

            // reset seconds back to 0
            seconds = 0

            // update minutes
            minutes++
        }

        // check if minutes over an hour
        if (minutes > 59) {

            // reset minutes back to 0

            // update hours
            hours++
        }

        session.updateWorkTimer(hours, minutes, seconds)
    }

    breakTick = () => {
        let session = this.context

        // call break limit tick
        this.breakLimitTick()

        let seconds = session.break_timer_seconds + 1
        let minutes = session.break_timer_minutes
        let hours = session.break_timer_hours

        // check if seconds over a minute
        if (seconds > 59) {

            // reset seconds back to 0
            seconds = 0

            // update minutes
            minutes++
        }

        // check if minutes over an hour
        if (minutes > 59) {

            // reset minutes back to 0

            // update hours
            hours++
        }

        session.updateBreakTimer(hours, minutes, seconds)
    }

    startWorkTimer = () => {
        let session = this.context

        // reset work limit timer to zero
        this.setState({
            work_seconds: 0,
            work_minutes: 0,
            work_hours: 0
        })

        session.startWorkTimer()
        clearInterval(this.breakTimerIntervalID)
        this.workTimerIntervalID = setInterval(
            () => this.workTick(),
            1000
        )
    }

    startBreakTimer = () => {
        let session = this.context

        // reset break limit timer to zero
        this.setState({
            break_seconds: 0,
            break_minutes: 0,
            break_hours: 0
        })

        session.startBreakTimer()
        clearInterval(this.workTimerIntervalID)
        this.breakTimerIntervalID = setInterval(
            () => this.breakTick(),
            1000
        )
    }

    updateWorkLimit= (ev) => {
        this.setState({ work_limit: ev.target.value })
    }

    updateBreakLimit= (ev) => {
        this.setState({ break_limit: ev.target.value })
    }

    componentWillUnmount() {
        clearInterval(this.workTimerIntervalID)
        clearInterval(this.breakTimerIntervalID)
    }

    render() {
        let session = this.context
        const { work_timer_hours, work_timer_minutes, work_timer_seconds, break_timer_hours, break_timer_minutes, break_timer_seconds, work_active, break_active } = session
        return (
            <Container>

                <TimerContainer>
                    <WorkButton onClick={this.startWorkTimer} disabled={work_active}>Work</WorkButton>
                    <LimitContainer>
                        <LimitLabel>Limit:</LimitLabel>
                        <LimitSelect value={this.state.work_limit} onChange={this.updateWorkLimit}>
                            {this.state.limits.map(limit => <option key={`work_limit_option_${limit}`} value={limit}>{limit}</option> )}
                        </LimitSelect>
                    </LimitContainer>
                    <ClockBackground>
                        <ClockText>
                            {work_timer_hours}
                            :{(work_timer_minutes < 10)?`0${work_timer_minutes}`:work_timer_minutes}
                            :{(work_timer_seconds < 10)?`0${work_timer_seconds}`:work_timer_seconds}
                        </ClockText>
                    </ClockBackground>
                </TimerContainer>

                <TimerContainer>
                    <BreakButton onClick={this.startBreakTimer} disabled={break_active}>Break</BreakButton>
                    <LimitContainer>
                        <LimitLabel>Limit:</LimitLabel>
                        <LimitSelect value={this.state.break_limit} onChange={this.updateBreakLimit}>
                            {this.state.limits.map(limit => <option key={`break_limit_option_${limit}`} value={limit}>{limit}</option> )}
                        </LimitSelect>
                    </LimitContainer>
                    <ClockBackground>
                        <ClockText>
                            {break_timer_hours}
                            :{(break_timer_minutes < 10)?`0${break_timer_minutes}`:break_timer_minutes}
                            :{(break_timer_seconds < 10)?`0${break_timer_seconds}`:break_timer_seconds}
                        </ClockText>
                    </ClockBackground>
                </TimerContainer>

            </Container>
        )
    }
}
SessionClock.contextType = SessionContext

export default SessionClock
