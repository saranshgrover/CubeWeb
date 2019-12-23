export interface Wca {
	user: User
}
export interface User {
	class: string
	url: string
	id: number
	wca_id: string
	name: string
	gender: string
	country_iso2: string
	delegate_status: string
	created_at: string
	updated_at: string
	teams?: TeamsEntity[] | null
	avatar: Avatar
	email: string
	region: string
	senior_delegate_id: number
}
export interface TeamsEntity {
	friendly_id: string
	leader: boolean
}
export interface Avatar {
	url: string
	thumb_url: string
	is_default: boolean
}
