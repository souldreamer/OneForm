import {
  useCallback,
  useRef,
  useState,
} from 'react'

import useUpdateEffect from './useUpdateEffect.js'

const initialSegmentedValues = (
  new Map()
)

const initialFlattenSegmentedValues = (
  Function
  .prototype
)

const useSubformState = (
  {
    flattenSegmentedValues = (
      initialFlattenSegmentedValues
    ),
    values,
  } = {}
) => {
  const segmentedValuesRef = (
    useRef(
      initialSegmentedValues
    )
  )

  const [
    localValues,
    setLocalValues,
  ] = (
    useState(
      values
    )
  )

  const updateLocalValues = (
    useCallback(
      () => {
        setLocalValues(
          flattenSegmentedValues(
            Array
            .from(
              segmentedValuesRef
              .current
              .values()
            )
          )
        )
      },
      [
        flattenSegmentedValues,
      ],
    )
  )

  const addValues = (
    useCallback(
      (
        identifier,
        values,
      ) => {
        segmentedValuesRef
        .current = (
          new Map(
            segmentedValuesRef
            .current
          )
          .set(
            identifier,
            values,
          )
        )

        updateLocalValues()
      },
      [
        updateLocalValues,
      ],
    )
  )

  const removeValues = (
    useCallback(
      (
        identifier,
      ) => {
        segmentedValuesRef
        .current = (
          new Map(
            segmentedValuesRef
            .current
          )
        )

        segmentedValuesRef
        .current
        .delete(
          identifier,
        )

        updateLocalValues()
      },
      [
        updateLocalValues,
      ],
    )
  )

  useUpdateEffect(
    () => {
      if (values) {
        addValues(
          'root',
          values,
        )
      }

      return () => {
        removeValues(
          'root',
        )
      }
    },
    [
      addValues,
      removeValues,
      values,
    ]
  )

  return {
    addValues,
    removeValues,
    values: localValues,
  }
}

export default useSubformState
