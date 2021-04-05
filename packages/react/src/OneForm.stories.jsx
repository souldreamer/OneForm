/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import Field from './Field.jsx'
import FieldErrorMessage from './FieldErrorMessage.jsx'
import FieldGroup from './FieldGroup.jsx'
import FieldValue from './FieldValue.jsx'
import OneForm from './OneForm.jsx'
import SubmitField from './SubmitField.jsx'

export default {
	args: {
		onChange: action(),
		onSubmit: action(),
	},
	argTypes: {
		onChange: 'changed',
		onSubmit: 'submitted',
	},
	component: OneForm,
	title: 'OneForm',
}

export const DisplayInputValue = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input name="message" />
			</Field>
		</div>

		<div>
			<FieldValue name="message" />
		</div>
	</OneForm>
)

export const InitialValues = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input name="message" />
			</Field>
		</div>

		<div>
			<FieldValue name="message" />
		</div>
	</OneForm>
)

InitialValues
.args = {
	values: {
		message: 'Hello World!',
	},
}

export const Submit = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input name="message" />
			</Field>
		</div>

		<div>
			<SubmitField>
				<button type="submit">
					Submit
				</button>
			</SubmitField>
		</div>
	</OneForm>
)

export const ValueStateChange = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input
					name="message1"
					placeholder="Message 1"
				/>
			</Field>
		</div>

		<div>
			<Field>
				<input
					name="message2"
					placeholder="Message 2"
				/>
			</Field>
		</div>
	</OneForm>
)

ValueStateChange
.args = {
	onChange: ({
		fieldName,
		value,
	}) => {
		if (fieldName === 'message1') {
			return {
				message2: value,
			}
		}
	},
}

export const CyclicValueStateChange = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input
					name="message1"
					placeholder="Message 1"
				/>
			</Field>
		</div>

		<div>
			<Field>
				<input
					name="message2"
					placeholder="Message 2"
				/>
			</Field>
		</div>
	</OneForm>
)

CyclicValueStateChange
.args = {
	onChange: ({
		value,
	}) => ({
		message1: value,
		message2: value,
	}),
}

export const Validation = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input name="message" />
			</Field>
		</div>
		<div>
			<FieldErrorMessage name="message" />
		</div>
		<div>
			<SubmitField>
				<button type="submit">
					Submit
				</button>
			</SubmitField>
		</div>
	</OneForm>
)

Validation
.args = {
	validations: {
		message: [
			{
				errorMessage: (
					'No lowercase letters.'
				),
				getIsValid: ({
					value,
				}) => (
					value
					&& (
						value
						=== (
							value
							.toUpperCase()
						)
					)
				),
			},
		],
	},
}

export const GroupValidation = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input
					name="message1"
					placeholder="Message 1"
				/>
			</Field>
		</div>

		<div>
			<Field>
				<input
					name="message2"
					placeholder="Message 2"
				/>
			</Field>
		</div>

		<div>
			<FieldErrorMessage name="message.error" />
		</div>

		<div>
			<SubmitField>
				<button type="submit">
					Submit
				</button>
			</SubmitField>
		</div>
	</OneForm>
)

GroupValidation
.args = {
	groupValidations: [
		{
			fieldNames: [
				'message1',
				'message2',
			],
			getErrorMessages: ({
				values,
			}) => (
				(
					(
						values
						.message1
					)
					!== (
						values
						.message2
					)
				)
				? {
					'message.error': (
						'Messages need to be identical.'
					),
					'message1': (
						true
					),
					'message2': (
						true
					),
				}
				: {}
			),
		},
	],
}

export const GroupValidationGrouping = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input
					name="message"
					placeholder="Message"
				/>
			</Field>
		</div>

		<FieldGroup
			id="a452"
			name="itemId"
		>
			<div>
				<Field>
					<input
						name="item"
						placeholder="Item a452"
					/>
				</Field>
			</div>

			<div>
				<FieldErrorMessage name="group.error" />
			</div>
		</FieldGroup>

		<FieldGroup
			id="7b23"
			name="itemId"
		>
			<div>
				<Field>
					<input
						name="item"
						placeholder="Item 7b23"
					/>
				</Field>
			</div>

			<div>
				<FieldErrorMessage name="group.error" />
			</div>
		</FieldGroup>

		<div>
			<SubmitField>
				<button type="submit">
					Submit
				</button>
			</SubmitField>
		</div>
	</OneForm>
)

GroupValidationGrouping
.args = {
	groupValidations: [
		{
			fieldNames: [
				'item',
				'message',
			],
			getErrorMessages: ({
				groups,
				values,
			}) => ({
				[
					'group.error'
					.concat(
						groups
						.itemId
						.groupString
					)
				]: (
					values
					.message
					.includes(
						values
						.item
					)
					&& (
						'You cannot have items in your message.'
					)
				),
			}),
			groupNames: [
				'itemId',
			],
		},
	],
	updatedValues: {
		'item/itemId:7b23': 'w',
		'item/itemId:a452': 'h',
		'message': 'hw',
	},
}
