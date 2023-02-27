import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../utils/router';
import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import currencyListSlice from '../store/reducers/slices/CurrencyListSlice';
import { fetchCurrencyList } from '../store/reducers/action-creators/CurrencyListAC';
import { type AnyAction } from '@reduxjs/toolkit';

jest.mock('axios');

const initialState = {
    source: "USD",
    quotes: {
        USDRUB: 1,
    },
    isLoading: false,
    error: null,
};
const fetchCurrencyListState = {
    success: true,
    timestamp: 1677454983,
    source: "USD",
    quotes: {
        USDRUB: 76.014984,
        USDJPY: 136.269496,
        USDEUR: 0.94761,
        USDCNY: 6.9561,
        USDKRW: 1314.787686,
        USDKZT: 448.840395
    }
};
describe('Converter actions tests', () => {
    test('is Loading Check', () => {
        render(
            <Provider store={setupStore()}>
                <RouterProvider router={router} />
            </Provider>
        );
        const action: AnyAction = { type: fetchCurrencyList.pending.type, };
        expect(currencyListSlice(initialState, action)).toEqual({
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
            type: fetchCurrencyList.rejected.type,
            payload: 'Error while loading data',
        };
        expect(currencyListSlice(initialState, action)).toEqual({
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
            type: fetchCurrencyList.fulfilled.type,
            payload: fetchCurrencyListState,
        };
        expect(currencyListSlice(initialState, action)).toEqual({
            source: fetchCurrencyListState.source,
            quotes: fetchCurrencyListState.quotes,
            isLoading: false,
            error: null,
        });
    });
});