import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import VisitationContext from './VisitationContext.js'

const useFieldVisitation = ({
	fieldName,
}) => {
	const {
		getIsFieldVisited,
		setFieldVisited,
		subscribeToIsFieldVisited,
	} = (
		useContext(
			VisitationContext
		)
	)

	const [
		isVisited,
		setIsVisited,
	] = (
		useState(
			getIsFieldVisited(
				fieldName
			)
		)
	)

	const setVisited = (
		useCallback(
			() => {
				setFieldVisited(
					fieldName,
				)
			},
			[
				fieldName,
				setFieldVisited,
			],
		)
	)

	useEffect(
		() => (
			subscribeToIsFieldVisited({
				identifier: (
					fieldName
				),
				subscriber: (
					setIsVisited
				),
			})
		),
		[
			fieldName,
			subscribeToIsFieldVisited,
		],
	)

	return {
		isVisited,
		setVisited,
	}
}

export default useFieldVisitation
