export const USER_ROLE= {
	admin:'admin',
	student:'student',
	faculty:'faculty'
} as const
type TUserRole = keyof typeof USER_ROLE