export const PRODUCTION = process.env.NODE_ENV === 'production'

export const WCA_ORIGIN = PRODUCTION
    ? 'https://www.worldcubeassociation.org'
    : 'https://staging.worldcubeassociation.org'

export const WCA_OAUTH_CLIENT_ID = PRODUCTION
    ? '' //   TODO: Get new oauth setup
    : 'example-application-id'
