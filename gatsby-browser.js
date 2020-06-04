import React from 'react'
import { SessionProvider } from './src/context/session'

export const wrapRootElement = ({ element }) => (
    <SessionProvider>{element}</SessionProvider>
)
