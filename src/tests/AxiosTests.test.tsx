import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../utils/router';
import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import axios from 'axios';
import {type ICurrencyConverter } from '../types/ICurrencyConverter';
import {fetchCurrencyConverter} from "../store/reducers/action-creators/CurrencyConverterAC";
import {fetchCurrencyList} from "../store/reducers/action-creators/CurrencyListAC";
import { type ICurrencyList } from '../types/ICurrencyList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test axios convert fetches', () => {
    let response: { data: ICurrencyConverter };
    let error: any;
    beforeEach(() => {
        response = {
            data: {
                info: {
                    quote: 0.013155,
                    timestamp: 1677428822,
                },
                query: {
                    amount: 1,
                    from: 'USD',
                    to: 'RUB',
                },
                result: 76.014966,
                success: true,
            },
        };
    });

    test('axios converter success request', async () => {
        render(
            <Provider store={setupStore()}>
                <RouterProvider router={router} />
            </Provider>
        );
        mockedAxios.get.mockResolvedValue(response);
        const { payload, } = await setupStore().dispatch(
            fetchCurrencyConverter({ amount: 1, from: 'USD', to: 'RUB', })
        );
        expect(payload).toEqual({ ...response.data, });
    });
    test('axios converter error request', async () => {
        render(
            <Provider store={setupStore()}>
                <RouterProvider router={router} />
            </Provider>
        );
        mockedAxios.get.mockRejectedValue(error);
        const { payload, } = await setupStore().dispatch(
            fetchCurrencyConverter({ amount: 1, from: '', to: '', })
        );
        expect(payload).toEqual(
            'Error while loading data'
        );
    });
});

describe('Test axios currencies fetches', () => {
    let response: { data: ICurrencyList };
    let error: any;
    beforeEach(() => {
        response = {
            data:{
                "success": true,
                "timestamp": 1677454983,
                "source": "USD",
                "quotes": {
                    "USDRUB": 76.014984,
                    "USDJPY": 136.269496,
                    "USDEUR": 0.94761,
                    "USDCNY": 6.9561,
                    "USDKRW": 1314.787686,
                    "USDKZT": 448.840395
                }
            },
        };
    });

    test('convert axios fetch success', async () => {
        render(
            <Provider store={setupStore()}>
                <RouterProvider router={router} />
            </Provider>
        );
        mockedAxios.get.mockResolvedValue(response);
        const { payload, } = await setupStore().dispatch(
            fetchCurrencyList({
                currencies: 'RUB, JPY, EUR, CNY, KRW, KZT',
                source: 'USD',
            })
        );
        expect(payload).toEqual({ ...response.data, });
    });
    test('convert axios fetch error', async () => {
        render(
            <Provider store={setupStore()}>
                <RouterProvider router={router} />
            </Provider>
        );
        mockedAxios.get.mockRejectedValue(error);
        const { payload, } = await setupStore().dispatch(
            fetchCurrencyList({
                currencies: 'RUB, JPY, EUR, CNY, KRW, KZT',
                source: '',
            })
        );
        expect(payload).toEqual('Error while loading data');
    });
});