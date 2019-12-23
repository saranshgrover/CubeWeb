import { WCA_ORIGIN } from './wca-env'
import { wcaAccessToken } from './auth'
import moment from 'moment'

export const getWcifPublic = (competitionId: string) =>
    wcaApiFetch(`/competitions/${competitionId}/wcif/public`)

export const getMe = () => wcaApiFetch(`/me`)

export const getUser = (userId: number) => {
    return wcaApiFetch(`/users/${userId}/`)
}

export const getMyUpcomingComps = (userId: string) => {
    return wcaApiFetch(`/users/${userId}?upcoming_competitions=true`)
}

export const getMyManagableComps = () => {
    const today = moment().startOf('day')
    const params = new URLSearchParams({
        managed_by_me: 'true',
        start: today.toISOString()
    })
    return wcaApiFetch(`/competitions?${params.toString()}`)
}

const wcaApiFetch = (path: string, fetchOptions = {}) => {
    const baseApiUrl = `${WCA_ORIGIN}/api/v0`

    return fetch(
        `${baseApiUrl}${path}`,
        Object.assign({}, fetchOptions, {
            headers: new Headers({
                Authorization: `Bearer ${wcaAccessToken()}`,
                'Content-Type': 'application/json'
            })
        })
    )
        .then(response => {
            if (!response.ok) throw new Error(response.statusText)
            return response
        })
        .then(response => response.json())
}
