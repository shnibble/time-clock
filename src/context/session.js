import React from 'react'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    sessions: [],
    active_session_task: '',
    active_session_start: '',
    active_session_work: '',
    active_session_break: '',
    work_active: false,
    work_timer_seconds: 0,
    work_timer_minutes: 0,
    work_timer_hours: 0,
    break_active: false,
    break_timer_seconds: 0,
    break_timer_minutes: 0,
    break_timer_hours: 0
}
const SessionContext = React.createContext(initialState)

class SessionProvider extends React.Component {

    state = initialState

    startSession = () => {
        // check if session is already active
        if (this.state.active_session_start) {
            window.alert('Session already started')
        } else {
            const start = moment().toISOString()
            this.setState({ active_session_start: start })
            localStorage.setItem('active_session_start', start )
        }
    }

    endSession = () => {
        if (this.state.active_session_start) {

            const session = {
                id: uuidv4(),
                start: this.state.active_session_start,
                end: moment().toISOString(),
                task: this.state.active_session_task,
                work: this.state.work_timer_hours + 'h ' + this.state.work_timer_minutes + 'm',
                break: this.state.break_timer_hours + 'h ' + this.state.break_timer_minutes + 'm'
            }

            let sessions = this.state.sessions.slice()
            sessions.push(session)
            
            this.setState({
                active_session_start: '',
                active_session_task: '',
                active_session_work: '',
                active_session_break: '',
                work_active: false,
                work_timer_seconds: 0,
                work_timer_minutes: 0,
                work_timer_hours: 0,
                break_active: false,
                break_timer_seconds: 0,
                break_timer_minutes: 0,
                break_timer_hours: 0,
                sessions
            })
            localStorage.setItem('active_session_start', '')
            localStorage.setItem('active_session_task', '')
            localStorage.setItem('sessions', JSON.stringify(sessions))
        } else {
            window.alert('No active session')
        }
    }

    deletePastSession = (ev) => {
        if(window.confirm('Are you sure you want to delete this session?')) {
            const id = ev.target.value
            let sessions = this.state.sessions
                        
            const new_sessions = sessions.filter(session => {
                return session.id !== id
            })

            this.setState({ sessions: new_sessions })
            localStorage.setItem('sessions', JSON.stringify(new_sessions))
        }
    }

    updateSessionWorkBreakTimes = (workTime, breakTime) => {
        this.setState({
            active_session_work: workTime,
            active_session_break: breakTime
        })
    }

    updateWorkTimer = (hours, minutes, seconds) => {
        this.setState({
            work_timer_hours: hours,
            work_timer_minutes: minutes,
            work_timer_seconds: seconds
        })
    }

    updateBreakTimer = (hours, minutes, seconds) => {
        this.setState({
            break_timer_hours: hours,
            break_timer_minutes: minutes,
            break_timer_seconds: seconds
        })
    }

    startWorkTimer = () => {
        this.setState({ work_active: true, break_active: false })
    }

    startBreakTimer = () => {
        this.setState({ work_active: false, break_active: true })
    }

    updateActiveSessionTask = (ev) => {
        this.setState({ active_session_task: ev.target.value })
    }

    componentDidMount() {
        const storedStart = localStorage.getItem('active_session_start')
        const storedTask = localStorage.getItem('active_session_task')
        const storedSessions = JSON.parse(localStorage.getItem('sessions'))
        this.setState({
            'active_session_start': storedStart || '',
            'active_session_task:': storedTask || '',
            'sessions': storedSessions || []
        })
    }

    render() {
        return (
            <SessionContext.Provider value={{
                session_active: (this.state.active_session_start)?true:false,
                active_session_task: this.state.active_session_task,
                updateActiveSessionTask: this.updateActiveSessionTask,
                sessions: this.state.sessions,
                startSession: this.startSession,
                endSession: this.endSession,
                deletePastSession: this.deletePastSession,
                work_active: this.state.work_active,
                work_timer_seconds: this.state.work_timer_seconds,
                work_timer_minutes: this.state.work_timer_minutes,
                work_timer_hours: this.state.work_timer_hours,
                break_active: this.state.break_active,
                break_timer_seconds: this.state.break_timer_seconds,
                break_timer_minutes: this.state.break_timer_minutes,
                break_timer_hours: this.state.break_timer_hours,
                updateWorkTimer: this.updateWorkTimer,
                updateBreakTimer: this.updateBreakTimer,
                startWorkTimer: this.startWorkTimer,
                startBreakTimer: this.startBreakTimer
            }}>
                {this.props.children}
            </SessionContext.Provider>
        )
    }
}

export default SessionContext
export { SessionProvider }
