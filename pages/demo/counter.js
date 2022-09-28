import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../lib/counterSlice'
import Layout from '../../components/layout'

export default function counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <Layout>
            <div>
                <div>
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </button>
                    <span>{count}</span>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </button>
                </div>
            </div>
        </Layout>

    )
}