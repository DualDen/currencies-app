import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../utils/router';
import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import currencyConverterSlice from '../store/reducers/slices/CurrencyConverterSlice';
import { fetchCurrencyConverter } from '../store/reducers/action-creators/CurrencyConverterAC';
import { type AnyAction } from '@reduxjs/toolkit';

jest.mock('axios');

const initialState = {
    quote: 1,
    isLoading: false,
    error: null,
};
const fetchCurrencyConverterState = {
    success: true,
    query: {
        from: "USD",
        to: "RUB",
        amount: 1
    },
    info: {
        timestamp: 1677456843,
        quote: 76.014994
    },
    result: 76.014994
};
describe('Converter actions tests', () => {
    test('is Loading Check', () => {
        render(
            <Provider store={setupStore()}>
                <RouterProvider router={router} />
            </Provider>
        );
        const action: AnyAction = { type: fetchCurrencyConverter.pending.type, };
        expect(currencyConverterSlice(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
        });
    });
    test('Error check', () => {
        render(
            <Provider store={setupStore()}>
                <RouterProvider router={router} />
            </Provider>
        );
        const action: AnyAction = {
            type: fetchCurrencyConverter.rejected.type,
            payload: 'Error while loading data',
        };
        expect(currencyConverterSlice(initialState, action)).toEqual({
            ...initialState,
            error: 'Error while loading data',
        });
    });
    test('Success check', () => {
        render(
            <Provider store={setupStore()}>
                <RouterProvider router={router} />
            </Provider>
        );
        const action: AnyAction = {
            type: fetchCurrencyConverter.fulfilled.type,
            payload: fetchCurrencyConverterState,
        };
        expect(currencyConverterSlice(initialState, action)).toEqual({
            quote: fetchCurrencyConverterState.info.quote,
            isLoading: false,
            error: null,
        });
    });
});